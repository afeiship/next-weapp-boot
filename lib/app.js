var nx = require('next-js-core2');
var defineGlobal = require('./define-global');
nx.App = function(inOptions) {
  App(inOptions);
  nx.$app = nx.GLOBAL.getApp();
  nx.$data = nx.$app.globalData;
  defineGlobal(nx.$data);
  return nx.$app;
};

module.exports = nx.App;
