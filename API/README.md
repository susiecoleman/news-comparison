# News Search API

API to search for news stories by topic.

## Infrastructure 

The API is built using AWS services. This project contains the Cloudformation templates to generate the API infrastructure. The Cloudformation templates are written in javascript using [AWS CDK](https://docs.aws.amazon.com/cdk/).

### Interface

The API interface is defined using the [Open API](https://swagger.io/docs/specification/about/) specification. The specification is [here](./apiSpecification.yml)

### Working with AWS CDK

#### Setting up CDK

1. Install the cdk command line tool

```
npm install -g aws-cdk
```

2. Check the tool installed correctly with 

```
cdk --version
```

#### Building the template

Run: `cdk synth`

The `cdk.json` file tells the CDK Toolkit how to execute the app and build the Cloudformation template.

`cdk synth`: emits the synthesized CloudFormation templates as `*.template.JSON` files in the [cdk.out](./cdk.out)  directory.
