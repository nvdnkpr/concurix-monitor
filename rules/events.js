module.exports = {
  keys: {
    addListener: {
      handleArgs: function(trace, clientstate){
        console.log('got handle args for events addListener');
      }
    },
    emit: {
      handleArgs: function(trace, clientstate){
        console.log('got handle args for events emit');
      }
    }
  }
};