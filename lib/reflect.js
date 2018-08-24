var nx = require('next-js-core2');
var RefBehavior = require('./behaviors/ref');

var observe = function (inContext, inObserves) {
    nx.each(inObserves, function (key, value) {
        nx.defineProperty(inContext.data, key, {
            get: value.get.bind(inContext),
            set: value.set.bind(inContext)
        });
    });
};

module.exports = function (inType) {
    var WxClass = nx.GLOBAL[inType];
    nx[inType] = function (inOptions) {
        var options = inOptions || {};
        var behaviors = options.behaviors || [];

        //COMPONENT:
        if (inType === 'Component') {
            nx.mix(options, {
                behaviors: behaviors.concat(RefBehavior)
            });
        }

        // COMPONENT AND BEHAVIOR:
        if (options.properties && '$observe' in options.properties) {
            options = nx.mix({
                methods: nx.mix({ observe }, options.methods),
                created: function () {
                    observe(this, options.properties.$observe.value);
                }
            }, options);

            nx.each(options.properties.$observe, function (key) {
                options.properties[key] = null;
            });
            options.properties.$observe = { type: Object, value: options.properties.$observe };
        }

        return WxClass(options);
    };
};