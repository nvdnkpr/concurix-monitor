module.exports = {
  keys: {
    get: {
      handleArgs: function(trace, clientstate){
        trace.transactionId = trace.args['0'];
        trace.originCallbackTop = trace.args['0'];      
      }
    },
    emit: { skip: true },
    addListerer: { skip: true},
    removeListener: {skip: true}
  },
  subModules: {
    './request': {blacklist: true},
    './response': {blacklist: true}
  }
};