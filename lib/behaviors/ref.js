var constants = require('../constants');
var REF_KEY = constants.REF_KEY;

module.exports = Behavior({
    properties: {
        ref: {
            type: String,
            value: null
        }
    },
    attached: function () {
        var ref = this.data.ref;
        nx[REF_KEY] = nx[REF_KEY] || {};
        if (ref) {
            nx[REF_KEY][ref] = this;
        }
    }
})