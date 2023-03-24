// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region

AWS.config.update({region: 'us-east-1'});

const gen = require('crypto');
const express = require('express');
const router = express.Router();

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
router.get('/', async function(req, res, next) {
    try{
        const projectParams = {
            TableName: 'bidos-projects',
            IndexName : 'project_pool_index',
            KeyConditionExpression: 'project_pool = :project_pool',
            ExpressionAttributeValues: {
                "project_pool":{}
            },
            ProjectionExpression: "project_name, tagline, project_pool"
        };

        await db.putItem(projectParams, (err, data)=>{
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
