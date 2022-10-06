#!/bin/bash

export PM2_HOME=/home/ec2-user/.pm2
cd /home/ec2-user/backend/
pm2 start --name backend npm -- start