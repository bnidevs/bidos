#!/bin/bash

cd /home/ec2-user/
mkdir -p foo
cd foo
SELF=$(curl https://ipinfo.io/ip)
wget --retry-connrefused --waitretry=1 --read-timeout=20 --timeout=15 -t 10 "http://$SELF:3000"