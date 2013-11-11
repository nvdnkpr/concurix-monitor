module.exports = {
  keys: {
    addListener: {
      handleArgs: function(trace, clientstate){
        console.log('got handle args for emit addListener');
      }
    }
  }
};