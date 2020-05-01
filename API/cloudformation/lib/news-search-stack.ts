import {
  Stack,
  Construct,
  StackProps,
  Tag,
  App,
  CfnOutput,
  RemovalPolicy,
} from "@aws-cdk/core";
import { Function, Runtime, Code } from "@aws-cdk/aws-lambda";
import { Bucket, BucketAccessControl } from "@aws-cdk/aws-s3";
import {
  PolicyStatement,
  Effect,
  User,
  Policy,
  CfnAccessKey,
} from "@aws-cdk/aws-iam";

class NewsSearchStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    Tag.add(this, "app", "news-search-api");

    const bucket = new Bucket(this, "NewsSearchLambdaCodeBucket", {
      bucketName: "news-lambda-code-repo",
      accessControl: BucketAccessControl.PRIVATE,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // Initially create an empty function for the code source.
    // The deployment process deploys the code in the "NewsSearchLambdaCodeBucket" to the lambda
    const lambda = new Function(this, "NewsSearchLambda", {
      runtime: Runtime.NODEJS_12_X,
      handler: "dist.index.handler",
      code: Code.fromInline("exports.handler = function(event,context){}"),
    });

    const githubAction: User = new User(this, "GitHubAction", {});

    const deployLambda: Policy = new Policy(this, "DeployLambda", {});
    deployLambda.addStatements(
      new PolicyStatement({
        resources: [`${bucket.bucketArn}/*`, bucket.bucketArn],
        actions: ["s3:PutObject", "s3:GetObject"],
        effect: Effect.ALLOW,
      }),
      new PolicyStatement({
        resources: [lambda.functionArn],
        actions: ["lambda:UpdateFunctionCode"],
        effect: Effect.ALLOW,
      })
    );
    deployLambda.attachToUser(githubAction);

    const accessKeys = new CfnAccessKey(this, "DeployKeys", {
      userName: githubAction.userName,
    });

    new CfnOutput(this, "AccessKey", { value: accessKeys.ref });
    new CfnOutput(this, "Secret Access Key", {
      value: accessKeys.attrSecretAccessKey,
    });
  }
}

const app = new App();
new NewsSearchStack(app, "NewsSearchStack");
