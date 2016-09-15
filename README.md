# docker-machine-env

Get asynchronously the docker environment variables in a javascript object for further use.

[![NPM](https://nodei.co/npm/docker-machine-env.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/docker-machine-env/)

## Use case

You want to use Docker with Node from Windows.

When you launch the Docker Quickstart Terminal, it sets some environment variables. When you're out of it, you have to run 
`docker-machine env`
that prints you some commands to run to set environment variables.

The module `docker-machine-env` gets from this command the considered environment variables in a javascript object so that you can use it in `child_process.exec` for example.

## Installation
`npm install docker-machine-env`

## API documentation
You can use this module in both Batch or Shell context. `docker-machine-env` is promisifyable.

`dockerMachineEnv([machine,] callback(err, envs))`

### machine

Type: `String`

The name of the docker machine you want the environment variables. Default to `default`.

### callback(err, envs)

Type: `Function`

A callback for handling the variables. 

#### err

Type: `Error`

contains errors thrown by the command, `null` if no error. You may not throw this error if docker-machine is not installed

#### envs

Type: `Object`

contains the environment variables as follow :

```javascript
{
  DOCKER_TLS_VERIFY: '1',
  DOCKER_HOST: 'tcp://192.168.99.100:2376',
  DOCKER_CERT_PATH: 'C:\\Users\\MyUser\\.docker\\machine\\machines\\default',
  DOCKER_MACHINE_NAME: 'default' 
}
```


## How to use

Getting the result of a `docker ps`

### with child_process

```javascript
var dockerMachineEnv = require('docker-machine-env');
var exec = require('child_process').exec;

dockerMachineEnv(function(err, envs){

	if(err)
	{
		//will throw an Error in the case docker-machine is not installed. 
		//depending where you use it, that may not be what you want
		throw err;
	}
	else
	{
		exec('docker ps', {env: envs}, (error, stdout, stderr) => {
		
			//you can print the result of docker ps
			console.log(stdout)
		})
	}
});
```

### with dockerode

```javascript

var Docker = require('dockerode');
var fs     = require('fs');
var dockerMachineEnv = require('docker-machine-env');

dockerMachineEnv(function(err, envs){

	//adding docker environment variables to the current process env
    Object.assign(process.env, envs);

	//this uses the process env previously defined
	var docker = new Docker(); 
	
	if(err)
	{
		//will throw an Error in the case docker-machine is not installed. 
		//depending where you use it, that may not be what you want
		throw err;
	}
	else
	{
		docker.listContainers({all: false}, function(err, containers) {
            console.log(containers);
        });
	}
});

```

