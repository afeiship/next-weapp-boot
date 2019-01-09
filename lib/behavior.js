var ObserveProcessor = require('./processors/observe');

nx.Component = function(inOptions) {
  // attach `observe`
  ObserveProcessor(inOptions);
  return nx.GLOBAL.Behavior(inOptions);
};
