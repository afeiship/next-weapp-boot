var constants = require('../constants');
var REF_KEY = constants.REF_KEY;

module.exports = Behavior({
    properties: {
        ref: {
            type: String,
            value: null
        }
    },
    attached() {
        nx[REF_KEY] = nx[REF_KEY] || {};
        nx[REF_KEY][this.data.ref] = this;
    }
})