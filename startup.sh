#!/bin/bash
echo "hello world" 
chmod +x startup.sh 

sudo apt-get update

sudo apt-get install postgresql postgresql-contrib

createdb announcetwo

sudo -i -u postgres
