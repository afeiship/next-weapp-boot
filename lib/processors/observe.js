// weixin: https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html?q=
module.exports = function (inOptions) {
  var options = inOptions || {};
  var observe = options.observe;
  // attach `observe`
  if (observe) {
    var oldCreated = options.attached || nx.noop;
    nx.mix(options, {
      attached: function () {
        nx.each(observe, function (key, value) {
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
