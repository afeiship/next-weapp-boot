var RefBehavior = require('../behaviors/ref');
var ReduxBehavior = require('../behaviors/redux');
var computedBehavior = require('miniprogram-computed');

module.exports = function(inOptions) {
  var options = inOptions || {};
  var behaviors = options.behaviors || [];
  // attach `redux-boot` behaviors:
  nx.mix(options, {
    behaviors: behaviors.concat([RefBehavior, ReduxBehavior, computedBehavior])
  });
};
