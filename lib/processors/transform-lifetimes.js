var nxCapitalize = require('next-capitalize');
var nxMapKey = require('next-map-key');
module.exports = function(inOptions) {
  var options = inOptions || {};
  var lifetimes = options.lifetimes || {};
  var oldMethods = options.methods || {};
  var methods = nxMapKey(lifetimes, function(key) {
    return nxCapitalize(key);
  });

  delete options.lifetimes;
  options.methods = nx.mix(oldMethods, methods);
};
