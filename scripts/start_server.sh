#!/bin/bash

source /root/.bashrc
alias pm2=/root/.nvm/versions/node/v16.17.1/bin/pm2
export PM2_HOME=/home/ec2-user/.pm2
cd /home/ec2-user/bidos/backend
pm2 start --name backend npm -- start