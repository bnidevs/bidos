const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const gen = require('crypto');
const { Octokit } = require("@octokit/core");
const { createOAuthUserAuth } = require("@octokit/auth-oauth-user");
const {SecretsManagerClient,GetSecretValueCommand,}  = require("@aws-sdk/client-secrets-manager");


async function a(event, context, callback){

    const secretName = "Bidos_Github_Auth_Creds";

    const client = new SecretsManagerClient({
        region: "us-east-1",
    });

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
    console.log(creds)

    const octokit = new Octokit({
        authStrategy: createOAuthUserAuth,
        auth:{
            clientId: creds.clientId,
            clientSecret: creds.clientSecret, //auth code here 
            code: "7d0d9955b16e62cc4ad6" //code that was response from code
        }
    });
    //get token from octokit
    const token = await octokit.auth();


    

    // // Exchanges the code for the user access token authentication on first call
    // // and caches the authentication for successive calls
    const { data } = await octokit.request("GET /user");

    const parsedUserData = AWS.DynamoDB.Converter.marshall(data);

    // //insert user into db
    const db = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    
    const userUUID = await gen.randomUUID();
    const sessionUUID = await  gen.randomUUID(); 


    const params = {
        "TableName": "bidos-users",
        "Item":{
            "id": {"S": userUUID},
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
    
    console.log(params);
    
    //add user to the users tabel
    let resp = await db.putItem(params).promise();
    
    console.log(resp);
    
};

a();
