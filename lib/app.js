var nx = require('next-js-core2');

nx.App = function(inOptions) {
  App(inOptions);
  nx.$app = nx.GLOBAL.getApp();
  nx.$memory = nx.$app.globalData;
  return nx.$app;
};

module.exports = nx.App;
