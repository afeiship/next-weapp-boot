var RefBehavior = require('../behaviors/ref');
var ReduxBehavior = require('../behaviors/redux');

module.exports = function(inOptions) {
  var options = inOptions || {};
  var behaviors = options.behaviors || [];
  // attach `redux-boot` behaviors:
  nx.mix(options, {
    behaviors: behaviors.concat([RefBehavior, ReduxBehavior])
  });
};
