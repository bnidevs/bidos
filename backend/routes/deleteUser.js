const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

/* GET home page. */
router.post('/deleteUser', function(req, res, next) {
   //delete a user from the bidos-users table
    const  params = {
    TableName: 'bidos-users',
    Key: {
        'username': {S: req.body.username}
    }
    };
    
    ddb.deleteItem(params, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
            res.json({'deleteUser': { title: 'Delete User', deleteUser: data }});
        }
    });

});

module.exports = router;
