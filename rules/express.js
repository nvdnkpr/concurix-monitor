module.exports = {
  keys: {
    get: {
      handleArgs: function(trace, clientstate){
        console.log('got handle args for express get', trace.args['0']);
        //trace.name += trace.args['0'];
        trace.transactionId = trace.args['0'];
        console.log('trace.name', trace.name);
      }
    },
    emit: {
      handleArgs: function(trace, clientstate){
        console.log('got handle args for express emit', trace.args['0']);
        //trace.name += trace.args['0']; 
        trace.transactionId = trace.args['0'];     
        console.log('trace.name ', trace.name);       
      }
    },
    addListener: {
      handleArgs: function(trace, clientState){
        console.log('got handle args for express addListener', trace.args['0']);
        //trace.name += trace.args['0'];    
        trace.transactionId = trace.args['0'];   
        console.log('trace.name ', trace.name);            
      }
    }
  }
};