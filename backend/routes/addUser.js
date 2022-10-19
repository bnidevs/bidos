const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

//declare DB
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});


router.post('/addUser', async (req, res)=> {
   //add a user to the bidos-users table


   //We can probably cache user table size on startup, but this will do for now. TODO @SSANDREW
   
   //have to get the number of items in the table for counter id
    const countParams = {
        TableName: 'bidos-users',
        Select: 'COUNT'
    };

    const count = await ddb.scan(countParams).promise();
    
    //generated id
    const tempId = str(count.Count + new Date().getTime());

    //hashed id
    const generatedId = await sha256(tempId);

    //add user to tables
    const addUserParams = {
        TableName: 'bidos-users',
        Item: {
            id: {S: generatedId},
            oAuth: {S: req.body.oAuthId},
            userData : {
              accountCreationTime: {S: new Date().getTime().toString()},  
            }
        }
    }

    ddb.putItem(addUserParams, (err, data) => {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
            res.json({'addUser': { title: 'Add User', addUser: data }});
        }
    });


    async function sha256(message) {
        // encode as UTF-8
        const msgBuffer = new TextEncoder().encode(message);                    
    
        // hash the message
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    
        // convert ArrayBuffer to Array
        const hashArray = Array.from(new Uint8Array(hashBuffer));
    
        // convert bytes to hex string                  
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    } 
   
});

module.exports = router;
