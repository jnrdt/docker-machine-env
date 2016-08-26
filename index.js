
const _ = require('lodash');
const child_process = require('child_process');

module.exports = function(host, callback){

	if(!host)
	{
		throw "a host has to be specified";
	}
	
	child_process.exec(`docker-machine env ${host}`, function(envError, envStdout, envStderr){
		
		var envs;
		
		if(!envError && !envStderr)
		{
			envs = _.chain(envStdout.split('\n'))
			.filter((cmd) => {

				return cmd.split(' ')[0] == "SET";
			})
			.map((cmd) => {
				
				var keyvalue = cmd.split(' ')[1].split('=');
				return [keyvalue[0], keyvalue[1]];
			})
			.fromPairs()
			.value();
		}
		
		callback(envError || envStderr, envs);
	})
}