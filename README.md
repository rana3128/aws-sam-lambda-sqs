# aws-sam-lambda-sqs
AWS lambda and sqs commutating eachother 

# deployment steps
    sam build
    sam deploy --stack-name sqstest  --s3-bucket rana3128-deploy --s3-prefix lambda-sqs-test --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM

# Delete stack if error keep occur and start again
    sam delete --stack-name sqstest 

# pipeline step to deploy
    - aws configure set region $AWS_DEFAULT_REGION
    - aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
    - aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
    - echo $STACK_NAME
    - sam build --template template-prod.yml
    - sam package --output-template-file packaged.yaml --s3-bucket <deployment_bucket> --region <region> --s3-prefix <some_prefix>
    - sam deploy --template-file packaged.yaml --stack-name <some-package-name>  --s3-bucket <deployment_bucket> --s3-prefix <some_prefix> --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM --region ap-south-1