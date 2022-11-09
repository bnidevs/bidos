const { createOAuthUserAuth } = require("@octokit/auth-oauth-user");
const AWS = require('aws-sdk');
const require('crypto')

async function a(event, context, callback){
    // TODO implement
    //verify a user auth code
    
    const auth = createOAuthUserAuth({
        clientId: "41aaee58d523ecf12369",
        clientSecret: "*", //auth code here 
        code: "d4fb63a1c326e7c33768" //code that was response from code
    });
      
      // Exchanges the code for the user access token authentication on first call
      // and caches the authentication for successive calls
    const { token } = await auth();

    //octokit request to get user info
    const octokit = new Octokit({ auth: token });
    const { data } = await octokit.request("GET /user");

    //insert user into db
    const db = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    
    const uuid = await gen.randomUUID();

    const params = {
        "TableName": "bidos-users",
        "Item":{
            "id": {"S": uuid},
            "auth":{
                "M": {
                    "github": {
                        "M": {
                            "userId":{ "S": event.userId},
                            "auth": {"S":event.auth}
                        }
                    }
                }
            },
            "user": {
                "M": {
                    "creationTimestamp": {"S": (new Date).toISOString()},
                    "userDetails": {
                        "M": data
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
