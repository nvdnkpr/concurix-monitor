var should = require('should');
var wrap = require('concurix-wrap');

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
      wrap.isWrapper(http.ClientRequest).should.be.true;
    })
  });

  describe('basic blacklist', function() {
    it('util should be blacklisted', function(){
      var util = require('util');
      wrap.isWrapper(util.isDate).should.be.false;
    });
  });   
});