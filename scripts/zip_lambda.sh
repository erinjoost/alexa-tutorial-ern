#!/bin/bash
npm ci --only=prod 
rm ./lambda.zip

echo "making lambda zip....."
mkdir temp
cp -r lambda/src/. temp
cp -r node_modules/ temp/node_modules/
cp -r package.json temp/package.json

time='date +%s'
cd temp
zip -rq ../lambda.zip .
cd ..

rm -rf temp/

npm ci