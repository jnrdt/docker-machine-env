
const _ = require('lodash');
const child_process = require('child_process');

//host, callback
//callback
module.exports = function(host, callback){

	var machine = "default";
	var callback;
	
	switch(arguments.length)
	{
		case 0:
			throw new Error("a callback(err, envs) has to be specified as a function");
		case 2:
			machine = arguments[0];
			if(!machine || typeof machine != "string")
			{
				throw new Error("a machine has to be specified as a string");
			}
		case 1:
			callback = arguments[arguments.length -1]
			if(!callback || typeof callback != "function")
			{
				throw new Error("a callback(err, envs) has to be specified as a function");
			}
			break;
		default:
			throw new Error("max two arguments : machine and callback(err, envs)");
	}
	

	child_process.exec(`docker-machine env ${machine}`, function(envError, envStdout, envStderr){
		
		var envs;
		var err = envError || envStderr;
		
		if(!err)
		{
			envs = _.chain(envStdout.split('\n'))
			.filter((cmd) => {
				var instr = cmd.split(' ')[0];
				return instr == "SET" || instr == "export";
			})
			.map((cmd) => {
				
				var keyvalue = cmd.split(' ')[1].split('=');
				var key = keyvalue[0];
				var value =  keyvalue[1].replace(/"/g, '');
				return [key, value];
			})
			.fromPairs()
			.value();
		}
		
		callback(err ? new Error(err) : null, envs);
	})
}