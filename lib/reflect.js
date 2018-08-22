var nx = require('next-js-core2');
var observe = function (inContext, inObserves) {
    var context = inContext || this;
    nx.each(inObserves, function (key, value) {
        nx.defineProperty(context.data, key, {
            get: value.get.bind(context),
            set: value.set.bind(context)
        });
    });
};

module.exports = function (inType) {
    var WxClass = nx.GLOBAL[inType];
    nx[inType] = function (inOptions) {
        var options = inOptions;
        if (options.properties && '$observe' in options.properties) {
            options = nx.mix({
                methods: nx.mix({ observe }, inOptions.methods),
                created: function () {
                    observe(this, inOptions.properties.$observe.value);
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