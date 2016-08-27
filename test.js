const dockerMachineEnv = require('./index');

//dockerMachineEnv();
//dockerMachineEnv('default');
dockerMachineEnv('default', function(err, env){
	
	if(err)
	{
		throw err;
	}
	else
	{
		console.log(env)
	}
})

dockerMachineEnv('default2', function(err, env){
	
	if(err)
	{
		throw err;
	}
	else
	{
		console.log(env)
	}
})


dockerMachineEnv('default', function(err, env){
	
	if(err)
	{
		throw err;
	}
	else
	{
		console.log(env)
	}
}, "hi");