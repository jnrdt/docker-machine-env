# docker-machine-env
get the env of docker in a variable

## installation
npm install docker-machine-env

## how to use
```javascript
var dockerMachineEnv = require('docker-machine-env');

dockerMachineEnv('default', function(err, envs){

	if(err)
	{
		throw err;
	}
	else
	{
		console.log(envs)
	}
});
```
