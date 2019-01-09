module.exports = function(inOptions) {
  var options = inOptions || {};
  var observe = options.observe || {};
  // attach `observe`
  if (observe) {
    var oldCreated = options.created || nx.noop;
    nx.mix(options, {
      created: function() {
        nx.each(observe, function(key, value) {
          nx.defineProperty(this.data, key, {
            get: value.get.bind(this),
            set: value.set.bind(this)
          });
        });
        oldCreated.apply(this, arguments);
      }
    });
  }
};
