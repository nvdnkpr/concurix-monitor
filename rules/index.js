// thanks to Greg Wang for this code gist on stack overflow: http://stackoverflow.com/questions/5364928/node-js-require-all-files-in-a-folder

exports.modRules = {};

// TODO this looks non-windows-compatible

// Load `*.js` under current directory as properties
//  i.e., `User.js` will become `exports['User']` or `exports.User`
require('fs').readdirSync(__dirname + '/').forEach(function(file) {
  if (file.match(/.+\.js/g) !== null && file !== 'index.js') {
    var name = file.replace('.js', '');
    exports.modRules[name] = require('./' + file);
  }
});

var BLACKLIST = {};
exports.blacklist = function blacklist() {
  if (Object.keys(BLACKLIST).length) return BLACKLIST;
  Object.keys(exports.modRules).filter(function (e) {
    if (exports.modRules[e].blacklist) return true;
  }).forEach(function (e) {
    BLACKLIST[e] = true;
  })
  return BLACKLIST;
}