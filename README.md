#ecs-deploy
Deploy container images to Amazon EC2 Container Service (ECS).

## Configuration

Unless indicated, the following environment variables are required:

| Environment Variable | Description |
|----------------------|-------------|
| AWS_ACCESS_KEY_ID | [AWS credentials](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html#Credentials_from_Environment_Variables) |
| AWS_SECRET_ACCESS_KEY | [AWS credentials](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html#Credentials_from_Environment_Variables) |
| AWS_SESSION_TOKEN | (Optional) [AWS credentials](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html#Credentials_from_Environment_Variables) |
| REGION | The AWS region |
| CLUSTER | The name of the target ECS cluster |
| SERVICE | The name of the target ECS service |
| CONTAINER | The name of the target ECS container |
| IMAGE | The image repository (e.g. some-user/some-app) |
| IMAGE_TAG | The tag to be deployed |

## Example Usage

```bash
npm install --global ecs-deploy
REGION=us-west-1 CLUSTER=my-cluster SERVICE=my-service CONTAINER=my-container IMAGE=my-user/my-repo IMAGE_TAG=latest ecs-deploy
```

## Alternate Usage

Install from the command line:

```bash
npm install --save-dev ecs-deploy
```

Add a `deploy` script to your `package.json`:

```json
{
  "scripts": {
    "deploy": "REGION=us-west-1 CLUSTER=my-cluster SERVICE=my-service CONTAINER=my-container IMAGE=my-user/my-repo ecs-deploy"
  }
}
```

When you're ready to deploy, make sure your image has been pushed to the registry.  Then from the command line:

```bash
IMAGE_TAG=latest npm run deploy
```
