const AWS = require('aws-sdk'),
      {
          DynamoDB
      } = require("@aws-sdk/client-dynamodb");
AWS.config.update({region: 'us-east-1'});
const express = require('express');
const router = express.Router();

const db = new DynamoDB({apiVersion: '2012-08-10'});

router.put('/projects/:project_id', async function(req, res, next) {
    try{
        const projectParams = {
            TableName: 'bidos-projects',
            Key: {
                "project_id": req.params.project_id
            },
            UpdateExpression: "set project_pool = :pool_value",
            ExpressionAttributeValues:{
                ":pool_value": req.body.pool_value
            },
            ReturnValues:"UPDATED_NEW"
        };

        await db.update(projectParams, (err, data)=>{
            if(err){
                throw new Error(err.toString());
            }
            res.status(200).send({
                status: "success",
                message: "Project pool updated successfully"
            });
        });
    }catch(error){
        res.status(500).send({
            status: "error",
            message: error.toString()
        });
    }
});