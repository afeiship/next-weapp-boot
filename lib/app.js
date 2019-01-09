var nx = require('next-js-core2');
var defineGlobal = require('./define-global');
nx.App = function(inOptions) {
  App(inOptions);
  nx.$app = nx.GLOBAL.getApp();
  nx.$globalData = nx.$app.globalData;
  defineGlobal(nx.$globalData);
  return nx.$app;
};

module.exports = nx.App;
