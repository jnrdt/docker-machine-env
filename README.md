# docker-machine-env

Get asynchronously the docker environment variables in a javascript variable for further use.

## Use case

You want to use Docker with Node (for example with child_process.exec) from Windows.

When you launch the Docker Quickstart Terminal, it sets some environment variables. When your out of it, you have to run 
`docker-machine env`
that print you some commands to run to set environment variables.

The module docker-machine-env gets from this command the considered environment variables in a javascript object so that you can use it in child_process.exec.

## Installation
`npm install docker-machine-env`

You can use this module in both Batch or Shell context.

## How to use : example
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
