var dockerMachineEnv = require('../');
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