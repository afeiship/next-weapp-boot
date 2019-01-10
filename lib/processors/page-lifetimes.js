var nxCapitalize = require('next-capitalize');
var nxMapKey = require('next-map-key');

module.exports = function(inOptions) {
  var options = inOptions || {};
  var lifetimes = options.lifetimes;
  delete options.lifetimes;
  var methods = nxMapKey(lifetimes, function(key) {
    return 'on' + nxCapitalize(key);
  });
  nx.mix(inOptions, methods);
};
