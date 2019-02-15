// weixin: https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html?q=
module.exports = function (inOptions) {
  var options = inOptions || {};
  var observe = options.observe;
  // attach `observe`
  if (observe) {
    var oldCreated = options.lifetimes.attached || nx.noop;
    nx.mix(options, {
      lifetimes: {
        attached: function () {
          nx.each(
            observe,
            function (key, value) {
              nx.defineProperty(this.data, key, {
                get: value.get.bind(this),
                set: value.set.bind(this)
              });
            },
            this
          );
          oldCreated.apply(this, arguments);
        }
      }
    });
  }
};
