const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const gen = require('crypto');
const { Octokit } = require("@octokit/core");
const { createOAuthUserAuth } = require("@octokit/auth-oauth-user");
const {SecretsManagerClient,GetSecretValueCommand,}  = require("@aws-sdk/client-secrets-manager");
const express = require('express');
const router = express.Router();

const client = new SecretsManagerClient({
    region: "us-east-1",
});

const db = new AWS.DynamoDB({apiVersion: '2012-08-10'});

/* loginUser page*/
router.post('/', async function(req, res, next) {


    try{
        const params = await req.body;
        const secretName = "Bidos_Github_Auth_Creds";

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
                res.send({
                    status: "failure",
                    error: error,
                    message: "Failed to fetch secret from AWS Secrets Manager"
                });

                return error;

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


            //attempt to get token from octokit
            let userData;

            await octokit.auth();
            //double parem wrap for no reason
            userData  = (await octokit.request("GET /user")).data;

            // try to find github id in db
            const userParams = {
                TableName: 'bidos-users',
                IndexName: "githubId-index",
                KeyConditionExpression: "githubId = :ghid",
                ExpressionAttributeValues: {
                    ":ghid": {"S" : userData.id.toString()}
                },
            };

            await db.query(userParams, async function(err, data) {
                if(err) {
                    console.error(err);
                }else{
                    //weird dynamoDB Syntax + null check for if it doesnt exist
                    let uuid = data.Items[0]?.id.S;
                    if(!data.Items.length){
                        //create a new user and generate the uuid.
                        uuid = await createNewUserGithub(userData);
                    }
                    const sessionUUID = await createNewSession(uuid);
                    res.send( {
                     status: "success",
                     sessionUUID: sessionUUID
                    });
                }
            });
        }else if(params.type === 'session'){
            //search token in session DB
            //if token exists and epoch is below current time return session id
            //else return error

            //search for session id in db, not query
            const sessionParams = {
                TableName: 'bidos-user-sessions',
                KeyConditionExpression: "id = :sid",
                ExpressionAttributeValues: {
                    ":sid": {"S" : params.code}
                },
            };

            await db.query(sessionParams, (err, data)=>{
                const now = Date.now() / 1000;

                if(!data.Count){
                    res.send({
                        status:"failure",
                        message: "User does not exist."
                    });
                    return;
                }else if(data.Items[0].expires.N < now){
                    res.send({
                        status:"error", // definitely not right
                        message: "Session has expired."
                    });
                    return;
                }else{
                    res.send({
                        status: "success"
                    });
                }
            });
        }
    }catch(error){
        //from docs
        //next(error);
    }

});

async function createNewUserGithub(userData){
    const userUUID = gen.randomUUID();

    const parsedUserData = AWS.DynamoDB.Converter.marshall(userData);

    const userParams = {
        "TableName": "bidos-users",
        "Item":{
            "id": {"S": userUUID},
            "githubId": {"S": userData.id.toString()},
            "oauth":{
                "M": {
                    "github": {
                        "M": {
                            //"token": {"S": token.token},
                            "sessionId": {"S": ""},
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

    await db.putItem(userParams).promise();

    return userUUID;


}


async function createNewSession(uuid, res){
    const sessionUUID = await gen.randomUUID(); 
        
    //epoch 2 days from now
    const expire = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 2);
    const sessionParams = {
        "TableName": "bidos-user-sessions",
        "Item":{
            "id" : {"S": sessionUUID},
            "userId" : {"S" : uuid},
            "expires": {"N": expire.toString()},
        }
    }

    //these have to be executed sequentially because we dont want to create phantom sessions.
    await db.putItem(sessionParams).promise();

    //update user with session id
    const userParams = {
        "TableName": "bidos-users",
        "Key":{
            "id": {"S": uuid}
        },
        "UpdateExpression": "set oauth.github.sessionId = :s",
        "ExpressionAttributeValues":{
            ":s": {"S": sessionUUID}
        },
        "ReturnValues":"UPDATED_NEW"
    }
    
    await db.updateItem(userParams).promise();
    return sessionUUID;

}
module.exports = router;
