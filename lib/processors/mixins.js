module.exports = function(inOptions) {
  var options = inOptions || {};
  var mixins = options.mixins || [];
  options.methods = options.methods || {};
  mixins.forEach(function(mixin) {
    return nx.mix(options.methods, mixin);
  });
};
