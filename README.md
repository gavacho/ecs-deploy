#ecs-deploy
Deploy container images to Amazon EC2 Container Service (ECS).

Applications running inside the container will have access to an environment variable named `IMAGE_TAG` which will contain the tag of the image used to build that container.

## Configuration

### A note about working with AWS
In order to communicate with AWS, the `aws-sdk` library needs to be configured with your authentication credentials and, possibly, with the aws region you wish to target.  More information can be found [here](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html#Credentials_from_Environment_Variables).  If you already use the aws cli then you're likely already configured.

In order to deploy your container, you need to provide this tool with some information in the form of environment variables:

|Variable Name        |Description                                        |
|---------------------|---------------------------------------------------|
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
    "deploy": "CLUSTER=my_cluster SERVICE=my_service CONTAINER=my_container IMAGE=my_user/my_repo ecs-deploy"
  }
}
```

When you're ready to deploy, make sure your image has been pushed to the registry.  Then from the command line:

```bash
IMAGE_TAG=latest npm run deploy
```
