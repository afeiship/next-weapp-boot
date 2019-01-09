var ObserveProcessor = require('./processors/observe');
var BehaviorProcessor = require('./processors/behavior');
var MixinsProcessor = require('./processors/mixins');

nx.Component = function(inOptions) {
  // attach behavior
  BehaviorProcessor(inOptions);
  // attach `observe`
  ObserveProcessor(inOptions);
  // attach `mixin`
  MixinsProcessor(inOptions);
  return Component(inOptions);
};

module.exports = nx.Component;
