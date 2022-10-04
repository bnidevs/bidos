_#!/bin/bash_

export PM2_HOME=/home/ubuntu/.pm2
pm2 delete backend
cd /home/ubuntu/backend/
pm2 start --name backend npm -- start