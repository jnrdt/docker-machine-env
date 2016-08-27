# docker-machine-env

Get asynchronously the docker environment variables in a javascript object for further use.

## Use case

You want to use Docker with Node (for example with child_process.exec) from Windows.

When you launch the Docker Quickstart Terminal, it sets some environment variables. When your out of it, you have to run 
`docker-machine env`
that print you some commands to run to set environment variables.

The module docker-machine-env gets from this command the considered environment variables in a javascript object so that you can use it in child_process.exec.

## Installation
`npm install docker-machine-env`

## API documentation
You can use this module in both Batch or Shell context. If Docker is not installed, it will throw an error. If docker-machine is not installed, it will silently return an empty object.

`dockerMachineEnv([machine,] callback(err, envs))`

### machine

Type: `String`

The name of the docker machine you want the environment variables. Default to `default`.

### callback

Type: `Function`

A callback for handling the variables. `err` will contain string formatted errors throwed by the command, `envs` will contain the environament variables as follow :

```javascript
{
  DOCKER_TLS_VERIFY: '1',
  DOCKER_HOST: 'tcp://192.168.99.100:2376',
  DOCKER_CERT_PATH: 'C:\\Users\\MyUser\\.docker\\machine\\machines\\default',
  DOCKER_MACHINE_NAME: 'default' 
}
```


## How to use : Example

Getting the result of a `docker ps`

```javascript
var dockerMachineEnv = require('docker-machine-env');
var exec = require('child_process').exec;

dockerMachineEnv(function(err, envs){

	if(err)
	{
		throw new Error(err);
	}
	else
	{
		exec('docker ps', {env: envs}, (error, stdout, stderr) => {
		
			//you can print the result of docker ps
		})
	}
});
```
