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
            IndexName : 'vis-index',
            KeyConditionExpression: 'vis = :vis',
            ExpressionAttributeValues: {
                ":vis": {'S' : 'public'}
            },
            ProjectionExpression: "project_name, tagline, project_pool"
        };

        await db.query(projectParams, (err, data)=>{
            if(err){
                console.log(err);
                throw new Error(err.toString());
            }
            res.status(200).send({
                status: "success",
                projects: data
            });
        });
    }catch(error){
        res.status(500).send({
            status: "error",
            message: error.toString()
        });
    }

});

module.exports = router;