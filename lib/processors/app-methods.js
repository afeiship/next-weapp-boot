module.exports = function(inOptions) {
  var options = inOptions || {};
  var methods = options.methods;
  delete options.methods;
  nx.mix(inOptions, methods);
};
