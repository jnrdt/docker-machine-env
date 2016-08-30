var Docker = require('dockerode');
var fs     = require('fs');
var dockerMachineEnv = require('../');

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