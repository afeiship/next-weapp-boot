module.exports = function(inOptions) {
  var options = inOptions || {};
  var mixins = options.mixins || [];
  var methods = options.methods || {};
  mixins.forEach(function(mixin) {
    nx.mix(methods, mixin);
  });
};
