#!/bin/bash

npm install pm2@latest -g
export PM2_HOME=/home/ec2-user/.pm2
pm2 stop backend