#!/bin/bash

export PM2_HOME=/home/ec2-user/.pm2
cd /home/ubuntu/backend/
pm2 start --name backend npm -- start