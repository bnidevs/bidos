const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const gen = require('crypto');
const express = require('express');
const router = express.Router();

const db = new AWS.DynamoDB({apiVersion: '2012-08-10'});

router.get('/', async function(req, res, next) {
    try{
        const projectParams = {
            TableName: 'bidos-projects',
            KeyConditionExpression: "public = :bpublic",
            ExpressionAttributeValues: {
                ":bpublic": {"BOOL" : true }
            },
        };

        await db.query(projectParams, (err, data)=>{
            res.send({
                status: "success",
                projects: data
            });
        });
    }catch(error){
        res.send({
            status: "error",
            message: error.toString()
        });
    }

});

module.exports = router;