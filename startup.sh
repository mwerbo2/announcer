#!/bin/bash
echo "Setting up announcement" 
chmod +x startup.sh 

sudo apt-get update

curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

sudo apt-get install -y nodejs

sudo apt-get install -y postgresql postgresql-contrib

sudo su postgres

psql -f init.sql 

exit 

npm install -g nodemon

cd ~/announcer

npm install

cd client

npm install

cd ..

npm run serve


