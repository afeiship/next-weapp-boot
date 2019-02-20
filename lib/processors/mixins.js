// todo: data/methods/mixins/lifetimes:
module.exports = function(inOptions) {
  var options = inOptions || {};
  var mixins = options.mixins || [];
  options.methods = options.methods || {};
  mixins.forEach(function(mixin) {
    var isString = typeof mixin === 'string';
    var mixin_ = isString ? require('mixins/' + mixin + '.js') : mixin;
    var methods = typeof mixin_.default === 'object' ? mixin_.default : mixin_;
    nx.mix(options.methods, methods);
  });
};
