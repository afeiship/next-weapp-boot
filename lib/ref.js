var nx = require('next-js-core2');

module.exports = function (inOptions) {
    inOptions.properties = nx.mix(inOptions.properties, {
        ref: {
            type: String,
            value: ''
        }
    });
}