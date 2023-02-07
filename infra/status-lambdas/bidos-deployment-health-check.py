import json
import boto3

client = boto3.client('codepipeline')

def lambda_handler(event, context):
  stack_layer = event['rawPath'].split('/')[-1]
    
  response = client.get_pipeline_state(
    name='bidos-' + stack_layer
  )

  latest_state = response['stageStates'][-1]['latestExecution']['status']

  colors = {'Cancelled': 'gray', 'InProgress': 'yellow', 'Failed': 'red', 'Stopped': 'red', 'Stopping': 'orange','Succeeded': 'green'}

  return {
    "schemaVersion": 1,
    "label": stack_layer + " deploy",
    "message": latest_state,
    "color": colors[latest_state]
  }
