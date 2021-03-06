var cache = require.cache;
var path = require('path');

function ModInfo(exportedModule, requireId, requireTop, rules){
  this.requireId = requireId;
  this.requireTop = requireTop;
  this.exportedModule = exportedModule;
  this.mod = this.getModuleEntry(exportedModule);
  this.rules = rules;
}

ModInfo.prototype.getModuleEntry = function getModuleEntry(){
  var keys = Object.keys(cache);
  for (var i = keys.length - 1; i >= 0; i--){
    var k = keys[i]
    if (cache[k].exports == this.exportedModule){
      return cache[k];
    }
  }
  return null;
}

ModInfo.prototype.getModuleId = function getModuleId(){
  if( this.mod ){
    return this.mod.id;
  } else {
    return this.requireTop;
  }
}

ModInfo.prototype.getRequireTop = function getRequireTop(){
  //if we have a top level module, then go ahead and return that.
  //if we don't, then check to see if the module was delay loaded by someone else.
  if( this.requireTop.charAt(0) != '.' || !this.mod ){
    return this.requireTop;
  }
  var top = bottomTopModuleFromPath(this.mod.id);

  return top || this.requireTop;
}

ModInfo.prototype.getTopChain = function getTopChain(){
  var chain = [];
  if( !this.mod ){
    chain.push(this.requireTop);
    return chain;
  }

  var parent = this.mod.parent;
  var top;
  while( parent ){
    top = bottomTopModuleFromPath(parent.id);
    if( top ){
      chain.push(top);
    }
    parent = parent.parent;
  }
  return chain;
}

ModInfo.prototype.isBlacklisted = function isBlacklisted(){
  var chain = this.getTopChain();
  chain.push(this.requireId);
  var blacklist = this.rules.blacklist();
  var i = 0;
  for( i = 0; i < chain.length; i++ ){
    if (blacklist[chain[i]]) {
      return true;
    }
  }
  //console.log('this.rules for ', this.rules, this.requireId, this.requireTop);
  var subModRules = this.rules.modRules[this.requireTop] && this.rules.modRules[this.requireTop].subModules;
  if( subModRules && subModRules[this.requireId] ){
    var ret = subModRules[this.requireId].blacklist;
    //if( ret ){ console.log('blacklisting ', this.requireId, this.requireTop);}
    return ret;
  }
}

//helper functions

function bottomTopModuleFromPath(filename){
  var toks = filename.split(path.sep);
  var i;
  for( i = toks.length -1 ; i >= 0; i--){
    if((toks[i] == 'node_modules' || toks[i] == 'concurix') && i < toks.length -1 ){
      return toks[i+1];
    } 
  }
  return null;
}

module.exports = ModInfo;
