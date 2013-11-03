var should = require('should');
var cx = require('../index.js');


describe('basic start test', function(){
  describe('start only', function(){
    cx().start().should.be.true;
  }); 
       
});
  

