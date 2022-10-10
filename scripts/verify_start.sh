#!/bin/bash

cd /home/ec2-user/
mkdir -p foo
cd foo
SELF=$(curl https://ipinfo.io/ip)
wget "http://$SELF:3000"