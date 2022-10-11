var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

/* GET home page. */
router.post('/addUser', function(req, res, next) {
   //add a user to the bidos-users table
    var params = {
    TableName: 'bidos-users',
    Item: {
        'username': {S: req.body.username},
        'email': {S: req.body.email}
    }
    };

    ddb.putItem(params, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
            res.json({'addUser': { title: 'Add User', addUser: data }});
        }
    });

});

module.exports = router;
