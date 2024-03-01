import { Stack, StackProps, aws_lambda as lambda, aws_s3 as s3, Duration } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { LambdaDestination } from "aws-cdk-lib/aws-s3-notifications";

export class CdkTsS3LambdaDemoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    const bucket = new Bucket(this, "MyBucket", {});

    const s3EventHandlerLambda = new lambda.Function(this, "S3EventHandler", {
      runtime: lambda.Runtime.NODEJS_LATEST,
      code: lambda.Code.fromAsset("lib/lambdas/s3EventHandler"),
      handler: "index.handler",
    });

    bucket.grantWrite(s3EventHandlerLambda);

    bucket.addEventNotification(s3.EventType.OBJECT_CREATED_PUT, new LambdaDestination(s3EventHandlerLambda));
  }
}
