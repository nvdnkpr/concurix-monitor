// Copyright Concurix Corporation 2012-2013. All Rights Reserved.
//
// The contents of this file are subject to the Concurix Terms of Service:
//
// http://www.concurix.com/main/tos_main
//
// The Software distributed under the License is distributed on an "AS IS"
// basis, WITHOUT WARRANTY OF ANY KIND, either express or implied.
// 
// Tracer for functions and require

'use strict';

var EventEmitter = require('events').EventEmitter;
var cxUtil = require('./util.js');
var extend = cxUtil.extend;
var log = cxUtil.log;
var isFunction = cxUtil.isFunction;
var isObject = cxUtil.isObject;
var iterateOwnProperties = cxUtil.iterateOwnProperties;
var hrtToUs = cxUtil.hrtToUs;
var addHrTimes = cxUtil.addHrTimes;
var wrap = require('concurix-wrap');
var mstats = require('module-stats');
var cache = require.cache;
var ModInfo = require('./modinfo');


module.exports = Tracer;

function Tracer(options){
  var tracer = {
    accountKey: options.accountKey,
    blacklistedModules: options.blacklistedModules,
    nestRequire: [],
    start: function(){
        this.running = true;
        if (!this.origRequire){
          this.wrapRequire();
        }
        mstats.start();
      },
    stop: function() {
      this.running = false;
      mstats.stop();
    },

    wrapRequire: function wrapRequire(){
      var proto = Object.getPrototypeOf(module);
      if (proto.require.__concurix_wrapper_for__){
        log('WARNING concurix tracer is already attached');
      } else {
        this.origRequire = proto.require;
        var globalState = { whitelisted: 0 };
        proto.require = wrap(proto.require)
          .before(this.requireBeforeHook)
          .after(this.requireAfterHook)
          .state(globalState)
          .getProxy();
      }      
    },

    restoreRequire: function restoreRequire(){
      var proto = Object.getPrototypeOf(module);
      proto.require = this.origRequire;      
    },

    // the this pointer will be incorrect, use tracer obj in closure
    requireBeforeHook: function requireBeforeHook(trace, clientState){
      tracer.pushNestRequire(trace);
    },

    // the this pointer will be incorrect, use tracer obj in closure
    requireAfterHook: function requireAfterHook(trace, clientState){
      var name = trace.args[0];
      var modinfo = new ModInfo(trace.ret, tracer.getRequireTop(trace));
      var options = {
        moduleId: modinfo.getModuleId(trace),
        moduleTop: modinfo.getRequireTop(trace),
        accountKey: tracer.accountKey
      };
      //console.log('computed top is ', options.moduleTop, ' for ',  tracer.getRequireTop(trace), 'chain ', modinfo.getTopChain());
      //console.log('trying to wrap ', options);
      var isNativeExtension = (name || '').match(/\.node$/);
      var shouldWrapExports = !isNativeExtension && 
          !tracer.isModuleBlacklisted(name, modinfo);
        
      if(shouldWrapExports){
        var _exports = trace.ret;
        mstats.wrap(name, _exports, options);
      }
      tracer.popNestRequire(trace);
    },

    isModuleBlacklisted: function isModuleBlacklisted(requireId, modinfo){
      if (!this.blacklistedModules){
        return;
      }
      var chain = modinfo.getTopChain();
      chain.push(requireId);
      var blacklistedModules = this.blacklistedModules;
      for (var i = blacklistedModules.length - 1; i >= 0; i--){
        if (chain.indexOf(blacklistedModules[i]) != -1 ) {
          console.log('module ', requireId, 'is blacklisted from ', blacklistedModules[i]);
          return true;
        }
      }
      return false;
    },

    pushNestRequire: function pushNestRequire(trace){
      var name = trace.args[0];
      if( name.charAt(0) != '.'){
        this.nestRequire.push(name);
      }      
    },

    popNestRequire: function popNestRequire(trace){
      var name = trace.args[0];
      if( name.charAt(0) != '.'){
        this.nestRequire.pop(name);
      }       
    },

    getRequireTop: function getRequireTop(trace){
      //if we don't have a top level name in the stack, then we are likely working
      //directly with user modules as opposed to installed npm's.  return that
      return this.nestRequire[this.nestRequire.length -1 ] || trace.args[0];       
    }, 
  }
  return tracer;
}
