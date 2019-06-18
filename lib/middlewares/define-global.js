var constants = require('../constants');
var DEFAULT_OPTIONS = { globalData: {} };
module.exports = function(inApp) {
  nx.mix(inApp, DEFAULT_OPTIONS, inApp.globalData);
  nx.defineProperty(nx, constants.GLOBAL, {
    set: function(inValue) {
      nx.each(inValue, function(key, value) {
        nx.set(inApp.globalData, key, value);
      });
    },
    get: function() {
      return inApp.globalData;
    }
  });
};
