const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const gen = require('crypto');
const { Octokit } = require("@octokit/core");
const { createOAuthUserAuth } = require("@octokit/auth-oauth-user");
const {SecretsManagerClient,GetSecretValueCommand,}  = require("@aws-sdk/client-secrets-manager");
const express = require('express');
const router = express.Router();


/* loginUser page*/
router.post('/', async function(req, res, next) {

    const params = await req.body;
    const secretName = "Bidos_Github_Auth_Creds";

    const client = new SecretsManagerClient({
        region: "us-east-1",
    });

    const db = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    
    //can prob separate into two diff functions
    if(params.type === 'oauth'){
        let response;
        try {
            response = await client.send(
                new GetSecretValueCommand({
                SecretId: secretName,
                VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
            })
        );
        } catch (error) {
            throw error;
        }
     
        const creds = JSON.parse(response.SecretString);

        const octokit = new Octokit({
            authStrategy: createOAuthUserAuth,
            auth:{
                clientId: creds.clientId,
                clientSecret: creds.clientSecret, //auth code here 
                code: req.body.code //code that was response from code
            }
        });

     
        //get token from octokit
        const token = await octokit.auth();
     
        // // Exchanges the code for the user access token authentication on first call
        // // and caches the authentication for successive calls
        const { data } = await octokit.request("GET /user");

       //this will have to be finished another time
        const params = {
            TableName: 'bidos-users',
            IndexName: "githubId-index",
            KeyConditionExpression: "githubId = :ghid",
            ExpressionAttributeValues: {
                ":ghid": {
                    "S": data.id.toString()
                }
            },
        };

         await db.query(params, (err, res)=>{
            if(err){
                console.log(err);
            }else{
                console.log(res);
            }
        });
    

        const parsedUserData = AWS.DynamoDB.Converter.marshall(data);
        // //insert user into db
        
        const userUUID = await gen.randomUUID();
        const sessionUUID = await gen.randomUUID(); 
     
     
        const userParams = {
            "TableName": "bidos-users",
            "Item":{
                "id": {"M": userUUID},
                "githubId": {"S": data.id.toString()},
                "auth":{
                    "M": {
                        "github": {
                            "M": {
                                "token": {"S": token.token},
                                "sessionId": {"S": sessionUUID},
                            }
                        }
                    }
                },
                "user": {
                    "M": {
                        "creationTimestamp": {"S": (new Date).toISOString()},
                        "userDetails": {
                            "M": parsedUserData
                        }
                    }       
                }
            },
            "ConditionExpression": 'attribute_not_exists(id)'
        };
        //epoch 2 days from now
        const expire = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 2);
        const sessionParams = {
            "TableName": "bidos-user-sessions",
            "Item":{
                "id" : {"S": sessionUUID},
                "expires": {"N": expire.toString()},
            }
        }

        

        let userResp = await db.putItem(userParams).promise();
        let sessionResp = await db.putItem(sessionParams).promise();

        res.send({
            "status": "success",
            "session": sessionUUID
        });
        console.log(userResp);
        console.logsz
        
    }else if(params.type === 'token'){
        //search token in session DB
        //if token exists and epoch is below current time return session id
        //else return error

        const sessionParams = {
            "TableName": "bidos-user-sessions",
            "Key":{
                "id" : {"S": req.code}
            }
        }

        let sessionResp = await db.getItem(sessionParams).promise();
        if(sessionResp.Item?.expires.N < Math.floor(Date.now() / 1000)){
        //return error
        res.send({"status": "error", "message": "session expired"});
        }else{
        //return session id
        res.send({"status": "success", "sessionId": params.code});
        }
    }

});

module.exports = router;
