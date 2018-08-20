var nx = require('next-js-core2');
var observe = function (inContext) {
    var context = inContext || this;
    nx.each(context.data.$watch, (key, value) => {
        nx.defineProperty(context.data, key, {
            get: value.get.bind(context),
            set: value.set.bind(context)
        });
    });
};

nx.Page = function (inOptions) {
    var options = nx.mix({
        methods: nx.mix({ observe }, inOptions.methods),
        created() {
            observe(this);
        }
    }, inOptions);

    return Component(options);
};

module.exports = nx.Page;