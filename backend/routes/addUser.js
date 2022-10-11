var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = (event, context) => {
    console.log(JSON.stringify(event, null, '  '));
    var tableName = "bidos-users";    
    dynamodb.putItem({
        "TableName": tableName,
        "Item" : {
            "email": {
                "S": event.email
            },
            "username": {
                "S": event.username
                
            },
        }
    }, function(err, data) {
        if (err) {
            console.log('Error putting item into dynamodb failed: '+err);
            context.done('error');
        }
        else {
            console.log('great success: '+JSON.stringify(data, null, '  '));
            context.done('Done');
        }
    });
};
