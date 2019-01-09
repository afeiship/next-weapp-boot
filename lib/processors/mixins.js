module.exports = function(inOptions) {
  var options = inOptions || {};
  var mixins = options.mixins || [];
  options.methods = options.methods || {};
  mixins.forEach(function(mixin) {
    var isString = typeof mixin === 'string';
    var mixin_ = isString ? require('mixins/' + mixin + '.js') : mixin;
    nx.mix(options.methods, mixin_);
  });
};
