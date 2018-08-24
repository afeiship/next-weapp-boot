var nx = require('next-js-core2');
var RefBehavior = require('./behaviors/ref');

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
        var behaviors = inOptions.behaviors || [];
        if (options.properties && '$observe' in options.properties) {
            options = nx.mix({
                methods: nx.mix({ observe }, inOptions.methods),
                created: function () {
                    observe(this, options.properties.$observe.value);
                }
            }, options );

            //COMPONENT:
            if(inType === 'Component'){
                nx.mix(options,{
                    behaviors: behaviors.concat(RefBehavior)
                });
            }

            nx.each(options.properties.$observe, function (key) {
                options.properties[key] = null;
            });
            options.properties.$observe = { type: Object, value: options.properties.$observe };
        }

        return WxClass(options);
    };
};