var nx = require('next-js-core2');
var constants = require('./constants');
var SERVICE_KEY = constants.SERVICE_KEY;

nx.$service = function(inKey) {
  var map = nx[SERVICE_KEY] || {};
  if (typeof map[inKey] !== 'undefined') {
    return map[inKey];
  }
  return map;
};

module.exports = nx.$service;
