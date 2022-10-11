var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

/* GET home page. */
router.get('/', function(req, res, next) {
  //test for writing to DB
  

  res.render('index', { title: 'Express' });
});

module.exports = router;
