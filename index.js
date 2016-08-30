'use strict';

const child_process = require('child_process');

//host, callback
//callback
module.exports = function(host, callback){

	var machine = "default";
	var callback = null;
	
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
			callback = arguments[arguments.length -1];
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
		var err = envError || (envStderr? new Error(envStderr): null);
		
		if(!err)
		{
			envs = {};
			envStdout.toString().split(/\n/).forEach(function (line) {
				var match = line.match(/(SET|export) ([^=]*)=(.*)/)
				if (match) envs[match[2]] = match[3].replace(/"/g, '');
			})
		}

		callback(err, envs);
	})
}