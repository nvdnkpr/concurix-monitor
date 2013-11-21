// Copyright Concurix Corporation 2012-2013. All Rights Reserved.
//
// The contents of this file are subject to the Concurix Terms of Service:
//
// http://www.concurix.com/main/tos_main
//
// The Software distributed under the License is distributed on an "AS IS"
// basis, WITHOUT WARRANTY OF ANY KIND, either express or implied.
//
// Concurix Monitoring Public API


// Make the object constructed by the concurixjs function be a singleton.
var Tracer = require('./tracer');
var rules = require('./rules');

var singleton = null;


module.exports = function concurixMonitor(options){
  if (!singleton) {

    var defaultOptions = {
      archiveHost: 'api.concurix.com', // Change to localhost for local testing
      archivePort: 80,
      accountKey: '28164101-1362-769775-170247',
      maxAge: 15,
      useContext: 'true',
      logsPath: null,
      //tracer's options
      enableTracer: true,
      clearModulesCache: true,
      whitelistedModules: null,
      // TODO ignored?
      blacklistedModules: ['util', 'cluster', 'console', 'rfile', 'callsite', 'browserify-middleware', 'bindings'],
      rules: rules
    };
  
    options = options || {};
    Object.keys(options).forEach(function(name){
      defaultOptions[name] = options[name];
    })
  
    var tracer = Tracer(defaultOptions);

    singleton = {
      start: function start(){ return tracer.start();},
      stop: function stop(){ return tracer.stop();},
      running: function running(){ return tracer.running;}
    };
  }
  return singleton;
}

module.exports.rules = rules;
