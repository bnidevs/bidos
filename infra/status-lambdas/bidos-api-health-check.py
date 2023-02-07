import json
import boto3

client = boto3.client('cloudwatch')

def lambda_handler(event, context):
  response = client.describe_alarms(
    AlarmNamePrefix='bidos'
  )
  
  danger = {"text": "offline", "color": "red"}
  warning = {"text": "unhealthy", "color": "yellow"}
  clear = {"text": "healthy", "color": "green"}
    
  returntext, returncolor = None, None
    
  for alarm in response['MetricAlarms']:
    if alarm['AlarmName'] == 'bidos-host-health-alarm':
      if alarm['StateValue'] == 'ALARM':
        returntext, returncolor = warning["text"], warning["color"]
      else:
        returntext, returncolor = clear["text"], clear["color"]
    if alarm['AlarmName'] == 'bidos-api-offline' and alarm['StateValue'] == 'ALARM':
      returntext, returncolor = danger["text"], danger["color"]
      break
  
  return {
    "schemaVersion": 1,
    "label": "api",
    "message": returntext,
    "color": returncolor
  }
