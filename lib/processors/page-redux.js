module.exports = function(inOptions) {
  var options = inOptions || {};
  var lifetimes = options.lifetimes || {};
  var oldOnload = lifetimes.load || nx.noop;
  var oldOnUnload = lifetimes.unload || nx.noop;
  var oldShow = lifetimes.show || nx.noop;
  var oldHide = lifetimes.hide || nx.noop;

  nx.mix(options.lifetimes, {
    load: function() {
      this.$connect = true;
      this.$unsubscribe = nx.$app.subscribe(this);
      oldOnload.apply(this, arguments);
    },
    unload: function() {
      this.$connect = false;
      oldOnUnload.apply(this, arguments);
      this.$unsubscribe();
    },
    show: function() {
      this.$connect = true;
      oldShow.apply(this, arguments);
    },
    hide: function() {
      this.$connect = false;
      oldHide.apply(this, arguments);
    }
  });
};
