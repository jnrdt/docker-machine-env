var assert = require('assert');
var should = require('should');
var dockerMachineEnv = require('../index');

describe('dockerMachineEnv', function() {
  before(function(){
    // The before() callback gets run before all tests in the suite. Do one-time setup here.
  });
  beforeEach(function(){
    // The beforeEach() callback gets run before each test in the suite.
  });
  it('should throw an Exception when the number of arguments is greater than 2', function(){
    dockerMachineEnv.bind(null, "firstArg", "secondArg", function(err, envs){}).should.throw();
  });
  it('should throw an Exception when the number of arguments is 0', function(){
    dockerMachineEnv.should.throw();
  });
  it('should throw an Exception when the last arg is not a function', function(){
    dockerMachineEnv.bind(null, "firstArg").should.throw();
    dockerMachineEnv.bind(null, "firstArg", "secondArg").should.throw();
  });
  it('should throw an Exception when first arg of two in not a string', function(){
    dockerMachineEnv.bind(null, function(){}, function(){}).should.throw();
  });
  it('should not throw an Exception when first arg is string and second in function', function(){
    dockerMachineEnv.bind(null, "firstArg", function(){}).should.not.throw();
  });
  it('should not throw an Exception when the only arg is a function', function(){
    dockerMachineEnv.bind(null, function(){}).should.not.throw();
  });
  after(function() {
  	// after() is run after all your tests have completed. Do teardown here.
  });
});
