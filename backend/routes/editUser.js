var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

/* GET home page. */
router.post('/editUser', function(req, res, next) {
  //edit a user from the bidos-users table
    var params = {
    TableName: 'bidos-users',
    Key: {
        'email' : {S: req.body.email}
    },
    UpdateExpression: 'set username = :e',
    ExpressionAttributeValues: {
        ':e': {S: req.body.username}
    },
    ReturnValues: 'UPDATED_NEW'
    };

    ddb.updateItem(params, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
            res.json({'editUser': { title: 'Edit User', editUser: data }});
        }
    });
});

module.exports = router;
