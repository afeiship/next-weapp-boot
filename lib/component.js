var nx = require('next-js-core2');
var observe = function (inContext) {
    var context = inContext || this;
    nx.each(context.data.$observe, function (key, value) {
        nx.defineProperty(context.data, key, {
            get: value.get.bind(context),
            set: value.set.bind(context)
        });
    });
};

nx.Component = function (inOptions) {
    var options = nx.mix({
        methods: nx.mix({ observe }, inOptions.methods),
        created: function () {
            observe(this);
        }
    }, inOptions);

    nx.each(options.properties.$observe, function (key) {
        options.properties[key] = null;
    });

    options.properties.$observe = { type: Object, value: options.properties.$observe };
    return Component(options);
};

module.exports = nx.Component;