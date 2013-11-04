var should = require('should');
var cx = require('../index.js')();
cx.start();

describe('basic tests', function(){
  describe('start only', function(){
    it('make sure we can start', function(){
      cx.running().should.be.true;     
    })
  }); 
  describe('basic requires', function(){
    it("require should return", function(){
      var http = require('http');
      http.should.be.an.Object;
    })
  });
       
});