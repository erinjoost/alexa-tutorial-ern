if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi


aws lambda update-function-code \
    --function-name  $LAMBDA_ARN \
    --zip-file fileb://lambda.zip

aws lambda update-function-configuration \
    --function-name  $LAMBDA_ARN \
    --environment '{"Variables":{"ASK_SKILL_ID":"'$ASK_SKILL_ID'", "DEBUG":"'$DEBUG'"}}'
