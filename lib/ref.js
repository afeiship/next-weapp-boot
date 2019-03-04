var nx = require('next-js-core2');
var constants = require('./constants');
var REF_KEY = constants.REF_KEY;

nx.$refs = function(inRef) {
  var refMap = nx[REF_KEY];
  if (typeof refMap[inRef] !== 'undefined') {
    return refMap[inRef];
  }
  return refMap;
};

module.exports = nx.$refs;
