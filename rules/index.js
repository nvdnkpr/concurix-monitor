// thanks to Greg Wang for this code gist on stack overflow: http://stackoverflow.com/questions/5364928/node-js-require-all-files-in-a-folder

exports.modRules = {};

// Load `*.js` under current directory as properties
//  i.e., `User.js` will become `exports['User']` or `exports.User`
require('fs').readdirSync(__dirname + '/').forEach(function(file) {
  if (file.match(/.+\.js/g) !== null && file !== 'index.js') {
    var name = file.replace('.js', '');
    exports.modRules[name] = require('./' + file);
  }
});