var ObserveProcessor = require('./processors/observe');
var BehaviorProcessor = require('./processors/behavior');

nx.Component = function(inOptions) {
  // attach behavior
  BehaviorProcessor(inOptions);
  // attach `observe`
  ObserveProcessor(inOptions);

  return nx.GLOBAL.Component(inOptions);
};
