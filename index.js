
const _ = require('lodash');
const child_process = require('child_process');


module.exports = function(host, callback){

	if(!host || typeof host != "string")
	{
		throw new Error("a host has to be specified as a string");
	}
	
	if(!callback || typeof callback != "function")
	{
		throw new Error("a callback(err, envs) has to be specified as a function");
	}
	
	child_process.exec(`docker-machine env ${host}`, function(envError, envStdout, envStderr){
		
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