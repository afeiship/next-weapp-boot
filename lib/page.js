var nx = require('next-js-core2');
var TransformLifetimesProcessor = require('./processors/transform-lifetimes');

nx.Page = function(inOptions) {
  TransformLifetimesProcessor(inOptions);
  return nx.Component(inOptions);
};

module.exports = nx.Page;
