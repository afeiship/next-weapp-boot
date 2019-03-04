var constants = require('../constants');

module.exports = function(inApp, inConfig) {
  // nx.$app = inApp;
  var provider = inConfig.provider || {};
  var $service = {};
  nx.forIn(provider, function(key, value) {
    var isService = key.indexOf('$') === 0;
    if (isService) {
      $service[key.slice(1)] = value;
    }
  });
  nx[constants.SERVICE_KEY] = $service;
};
