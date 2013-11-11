module.exports = {
  keys: {
    get: {
      handleArgs: function(trace, clientstate){
        console.log('got handle args for express get');
      }
    }
  }
};