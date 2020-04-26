import { Stack, Construct, StackProps, Tag, App } from "@aws-cdk/core";
import { Function, Runtime, Code } from "@aws-cdk/aws-lambda";
import { Bucket, BucketAccessControl } from "@aws-cdk/aws-s3";

class NewsSearchStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    Tag.add(this, "app", "news-search-api");

    new Bucket(this, "NewsSearchLambdaCodeBucket", {
      bucketName: "news-lambda-code-repo",
      accessControl: BucketAccessControl.PRIVATE,
    });

    // Initially create an empty function for the code source.
    // The deployment process deploys the code in the "NewsSearchLambdaCodeBucket" to the lambda
    new Function(this, "NewsSearchLambda", {
      runtime: Runtime.NODEJS_12_X,
      handler: "dist.index.handler",
      code: Code.fromInline("exports.handler = function(event,context){}"),
    });
  }
}

const app = new App();
new NewsSearchStack(app, "NewsSearchStack");
