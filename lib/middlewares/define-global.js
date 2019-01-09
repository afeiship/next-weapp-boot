var constants = require('../constants');
module.exports = function(inApp) {
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
