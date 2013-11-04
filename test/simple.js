var should = require('should');
var cx = require('../index.js')();


describe('basic start test', function(){
  describe('start only', function(){
    it('make sure we can start', function(){
      cx.start();
      cx.running().should.be.true;     
    })

  }); 
       
});
  

