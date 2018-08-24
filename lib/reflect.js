var nx = require('next-js-core2');
var ref = require('./ref');
var refAttach = require('./ref-attach');
var selector = require('./selector');
var constants = require('./constants');

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
        var options = ref(inOptions);
        var refValue = nx.path(options, 'properties.ref');

        if (options.properties && '$observe' in options.properties) {
            options = nx.mix({
                methods: nx.mix({ observe }, inOptions.methods),
                created: function () {
                    refAttach(this, refValue);
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