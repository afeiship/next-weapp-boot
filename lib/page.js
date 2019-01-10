var nx = require('next-js-core2');
var PageReduxProcessors = require('./processors/page-redux');
var PageLifetimesProcessors = require('./processors/page-lifetimes');
var PageMethodsProcessors = require('./processors/page-methods');
var MixinsProcessor = require('./processors/mixins');

nx.Page = function(inOptions) {
  PageReduxProcessors(inOptions);
  PageLifetimesProcessors(inOptions);
  MixinsProcessor(inOptions);
  PageMethodsProcessors(inOptions);
  return Page(inOptions);
};

module.exports = nx.Page;
