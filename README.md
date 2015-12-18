#ecs-deploy
Deploy container images to Amazon EC2 Container Service (ECS)

## Configuration

### A note about working with AWS
In order to communicate with AWS, the `aws-sdk` library needs to be configured with your authentication credentials and, possibly, with the aws region you wish to target.  More information can be found [here](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html#Credentials_from_Environment_Variables).

In order to deploy your container, you need to provide this tool with some information in the form of environment variables:

|Variable Name        |Description                                        |
|---------------------|---------------------------------------------------|
|CLUSTER              |The name of the target ECS cluster                 |
|SERVICE              |The name of the target ECS service                 |
|CONTAINER            |The name of the target ECS container               |
|IMAGE                |The image repoistory (e.g. example_org/example_app)|
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
    "deploy": "CLUSTER=my_cluster SERVICE=my_service CONTAINER=my_container IMAGE=my_user/my_repo ecs-deploy"
  }
}
```

When you're ready to deploy, make sure your container has been pushed to your container registry.  Then from the command line:

```bash
IMAGE_TAG=latest npm run deploy
```
