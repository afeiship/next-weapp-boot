var constants = require('./constants');
var REF_KEY = constants.REF_KEY;


module.exports = function (inContext, inRef) {
    nx[REF_KEY] = nx[REF_KEY] || {};
    nx[REF_KEY][inRef] = inContext;
};