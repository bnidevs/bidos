#!/bin/bash

source /root/.bashrc
alias pm2=/root/.nvm/versions/node/v16.17.1/bin/pm2
export PM2_HOME=/root/.pm2
pm2 stop --silent all