var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

/* GET users listing. */
router.get('/users', function(req, res, next) {
  //list all users from the bidos-users table
  var params = {
    TableName: 'bidos-users',
    ProjectionExpression: 'username, email'
  };

   ddb.scan(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Items);
      res.json({'users': { title: 'Users', users: data.Items }});
    }
  });
});

module.exports = router;
