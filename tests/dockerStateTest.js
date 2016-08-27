var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var child_process = require('child_process');
var dockerMachineEnv = require('../index');

describe('dockerMachineEnv', function() {
  before(function(){
    // The before() callback gets run before all tests in the suite. Do one-time setup here.
  });
  beforeEach(function(){
    // The beforeEach() callback gets run before each test in the suite.
  });
  
  it('should return an Error in callback if docker-machine is down (exec err)', function(done){
	
    var stub = sinon.stub(child_process, "exec", function(command, cb){
  
      cb(new Error("docker may not be started, or docker isn't installed", ""));
    });
  
  
    var called = false;
    dockerMachineEnv(function(err, envs){
      called = true; 
      (err).should.be.an.Error;
      (envs == null).should.be.true;
      stub.restore();
      done();	
    });
    
    called.should.be.true;
  });
  
  it('should return an Error in callback if exec gets a stderr', function(done){
	
    var stub = sinon.stub(child_process, "exec", function(command, cb){
  
      cb(null, "", "something went wrong");
    });
  
  
    var called = false;
    dockerMachineEnv(function(err, envs){
      called = true; 
      (err).should.be.an.Error;
      (envs == null).should.be.true;
      stub.restore();
      done();	
    });
    
    called.should.be.true;
  });
  
  it('should return an object containing environments variables', function(done){
    
    var stub = sinon.stub(child_process, "exec", function(command, cb){
      
      cb(null, "SET KEY=VALUE");
    });
  
    var called = false;
      dockerMachineEnv("default", function(err, envs){
      called = true;
      (Object.keys(envs).length).should.be.exactly(1);
      (err == null).should.be.true;
      stub.restore();
      done();	
    });
    
    called.should.be.true;
  });
  after(function() {
  	// after() is run after all your tests have completed. Do teardown here.
  });
});
