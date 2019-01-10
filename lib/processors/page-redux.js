module.exports = function(inOptions) {
  var options = inOptions || {};
  var lifetimes = options.lifetimes;
  var oldOnload = lifetimes.load || nx.noop;
  var oldOnUnload = lifetimes.unload || nx.noop;

  nx.mix(options.lifetimes, {
    load: function() {
      this.unsubscribe = nx.$app.subscribe(this);
      oldOnload.apply(this, arguments);
    },
    unload: function() {
      oldOnUnload.apply(this, arguments);
      this.unsubscribe();
    }
  });
};
