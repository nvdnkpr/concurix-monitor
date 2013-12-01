module.exports = {
  all: {
    skipKeys: true
  },
  keys: {
    ClientRequest: {whitelist: true},
    get: {whitelist: true},
    createServer: {whitelist: true},
    createClient: {whitelist: true},
    Server: {whitelist: true}
  }
};