const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const lambda = new AWS.Lambda();


/* loginUser page*/
router.post('/', async function(req, res, next) {
   //reroute to the user login to lambda function to hide user storing


   //make a call to github api with auth token to get user id
   const resp = await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'token ' + req.body.token
        }
    }).json();

    if(resp.status !== 200){
        res.status(401).send("Invalid token");
    }else{
        const payload = {
            "auth": req.body.token,
            "userId": resp.id
        }
        const params = {
            FunctionName: 'insertNewUser',
            InvocationType: 'RequestResponse',
            LogType: 'Tail',
            Payload: JSON.stringify(payload)
        };
    
        lambda.invoke(params, function(err, data) {
            if (err) {
                console.log(err, err.stack);
            } else {
                console.log(data);
                res.json({
                    'loginUser': {
                        title: 'Login User',
                        loginUser: data,
                        success: true //eventually data.success for quick access.
                    }
                });
            }
        }
        );
    }
});

module.exports = router;
