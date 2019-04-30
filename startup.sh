#!/bin/bash
echo "hello world" 
chmod +x startup.sh 

sudo apt-get update

curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

sudo apt-get install -y nodejs

sudo apt-get install -y postgresql postgresql-contrib

sudo -u postgres psql postgres

\password postgres

sudo -u postgres createdb announcetwo

npm install -g nodemon

npm install

cd client

npm install

cd ..

npm run serve

