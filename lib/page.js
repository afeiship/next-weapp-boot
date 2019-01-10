var nx = require('next-js-core2');
var PageLifetimesProcessors = require('./processors/page-lifetimes');
var PageMethodsProcessors = require('./processors/page-methods');

nx.Page = function(inOptions) {
  PageLifetimesProcessors(inOptions);
  PageMethodsProcessors(inOptions);
  return Page(inOptions);
};

module.exports = nx.Page;
