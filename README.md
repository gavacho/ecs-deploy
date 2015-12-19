#ecs-deploy
Deploy container images to Amazon EC2 Container Service (ECS).

Applications running inside the container will have access to an environment variable named `IMAGE_TAG` which will contain the tag of the image used to build that container.

## Configuration

### A note about working with AWS
If you've run `aws configure` using use the [aws cli](https://aws.amazon.com/cli/) tool then you probably already have the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables defined.  Otherwise, you will need to set some [environment variables](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html#Credentials_from_Environment_Variables) so that `ecs-deploy` can interact with AWS on your behalf.

In order to deploy your container, you need to provide this tool with some information in the form of environment variables:

|Variable Name        |Description                                        |
|---------------------|---------------------------------------------------|
|REGION               |The AWS region                                     |
|CLUSTER              |The name of the target ECS cluster                 |
|SERVICE              |The name of the target ECS service                 |
|CONTAINER            |The name of the target ECS container               |
|IMAGE                |The image repository (e.g. example_org/example_app)|
|IMAGE_TAG            |The tag of the target container image              |

## Example Usage

Install from the command line:

```bash
npm install --save-dev ecs-deploy
```

Add a `deploy` script to your `package.json`:

```json
{
  "scripts": {
    "deploy": "REGION=us-west-1 CLUSTER=my_cluster SERVICE=my_service CONTAINER=my_container IMAGE=my_user/my_repo ecs-deploy"
  }
}
```

When you're ready to deploy, make sure your image has been pushed to the registry.  Then from the command line:

```bash
IMAGE_TAG=latest npm run deploy
```
