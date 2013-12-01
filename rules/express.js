module.exports = {
  keys: {
    get: {
      handleArgs: function(trace, clientstate){
        //console.log('got handle args for express get', trace.args['0']);
        //trace.name += trace.args['0'];
        trace.transactionId = trace.args['0'];
        trace.originCallbackTop = trace.args['0'];
      
        console.log('setting origin top for ', trace.args[0], trace.funInfo.name);
        //console.log('trace.name', trace.name);
      }
    },
    emit: { skip: true },
    addListerer: { skip: true},
    removeListener: {skip: true}
  }
};