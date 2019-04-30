#!/bin/bash
echo "hello world" 
chmod +x startup.sh 

sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade

sudo apt-get install postgresql postgresql-contrib

createdb announcetwo

npm install

cd client

npm install

cd ..

npm run serve

