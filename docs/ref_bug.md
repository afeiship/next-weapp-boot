# ref_bug

<!-- # /Users/feizheng/finxos/institute-miaotu/node_modules/next-weapp-boot/lib/middlewares/redux-boot.js -->
```js
var methods = {
  init: function(inApp, inOptions) {
    // .... 
    this._componentsMap = {};
  },
  renderTo: function(inContext) {
    var uuid = this._options.uuid;
    var renderMap = this._componentsMap;
    var connected = inContext.$connect;
    if (connected || typeof connected === "undefined") {
      var uid = inContext[uuid];
      var type = inContext.is;
      if (!renderMap[uid]) {
        renderMap[uid] = true;
        this.pureRender(inContext);
      } else {
        // ....
      }
    }
  }
};
```
