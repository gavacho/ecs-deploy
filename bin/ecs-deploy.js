#! /usr/bin/env node

var _ = require('lodash');
var AWS = require('aws-sdk');
var requireEnvVariables = require('require-environment-variables');

invoke(function() {
  requireEnvVariables([
    'REGION',
    'CLUSTER',
    'SERVICE',
    'CONTAINER',
    'IMAGE',
    'IMAGE_TAG',
  ]);

  var config = _.pick(process.env, [
    'REGION',
    'CLUSTER',
    'SERVICE',
    'CONTAINER',
    'IMAGE',
    'IMAGE_TAG',
  ]);

  var ecs = promisifyMethods(new AWS.ECS({ region: config.REGION }));

  return ecs.describeServices({
    cluster: config.CLUSTER, services: [config.SERVICE]
  })
    .then(function(result) {
      return ecs.describeTaskDefinition({
        taskDefinition: result.services[0].taskDefinition
      });
    })
    .then(function(result) {
      var task = result.taskDefinition;
      console.log('Current task definition: ' + task.taskDefinitionArn);
      return ecs.registerTaskDefinition(nextTask(task, config.CONTAINER, config.IMAGE, config.IMAGE_TAG));
    })
    .then(function(result) {
      var registeredTask = result.taskDefinition;
      console.log('Next task definition: ' + registeredTask.taskDefinitionArn);
      return ecs.updateService({
        cluster: config.CLUSTER,
        service: config.SERVICE,
        taskDefinition: registeredTask.taskDefinitionArn
      });
    });
}).catch(function(error) {
  console.log(error.stack);
  process.exit(1);
});

function nextTask(task, containerName, image, tag) {
  return {
    family: task.family,
    volumes: task.volumes,
    taskRoleArn: task.taskRoleArn,
    containerDefinitions: task.containerDefinitions.map(function(container) {
      if (container.name === containerName) {
        return nextContainer(container, image, tag);
      }
      return container;
    })
  };
}

function nextContainer(container, image, tag) {
  return _.assign({}, container, {
    image: image + ':' + tag,
  });
}

function invoke(block) {
  return new Promise(function(resolve, reject) {
    try {
      resolve(block());
    } catch (error) {
      reject(error);
    }
  });
}

function promisifyMethods(obj) {
  return _.mapValues(_.pick(obj, _.functionsIn(obj)), function(method) {
    return promisify(method.bind(obj));
  });
}

function promisify(fn) {
  return function() {
    var context = this;
    var args = _.toArray(arguments);
    return new Promise(function(resolve, reject) {
      fn.apply(context, args.concat(function(error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }));
    });
  };
}
