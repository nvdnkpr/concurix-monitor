var cache = require.cache;
var path = require('path');

function ModInfo(exportedModule, requireTop){
  this.requireTop = requireTop;
  this.exportedModule = exportedModule;
  this.mod = this.getModuleEntry(exportedModule);
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
  var toks = this.mod.id.split(path.sep);
  var i;
  for( i = toks.length -1 ; i >= 0; i--){
    if(toks[i] == 'node_modules' && i < toks.length -1 ){
      return toks[i+1];
    }
  }
  return this.requireTop;
}

module.exports = ModInfo;
