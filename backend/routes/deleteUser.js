var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

/* GET home page. */
router.post('/deleteUser', function(req, res, next) {
   //delete a user from the bidos-users table
    var params = {
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
