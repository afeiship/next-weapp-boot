var ObserveProcessor = require('./processors/observe');

nx.Behavior = function(inOptions) {
  // attach `observe`
  ObserveProcessor(inOptions);
  return nx.GLOBAL.Behavior(inOptions);
};

module.exports = nx.Behavior;
