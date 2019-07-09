# ref_bug
> 总结：一个无关痛痒的优化，带来的严重后果
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


## improvement-version
```js
var methods = {
  init: function(inApp, inOptions) {
    // .... 
    // this._componentsMap = {};
  },
  renderTo: function(inContext) {
    var uuid = this._options.uuid;
    var renderMap = this._componentsMap;
    var connected = inContext.$connect;
    if (connected || typeof connected === "undefined") {
      // var uid = inContext[uuid];
      // var type = inContext.is;
      // if (!renderMap[uid]) {
      //   renderMap[uid] = true;
      //   this.pureRender(inContext);
      // } else {
      //   // ....
      // }
      // code goes here!
    }
  }
};
```


## 出现的场景
1. detail 页面有个大的图表
2. 调用 switchTab 回到首页
3. 首页出现： vdSyncBatch 数据传输长度为 1623104 已经超过最大长度 1048576 
4. 定位基本上是 后面的 setData 出现了问题导致的
5. 肯定是性能问题
6. 继续跟，应该是detail页没有被释放
7. 组件没有被释放/page 没有被释放
8. 找到里面的 map，map上有的数据一直存在内存里，占用内存
9. 奇怪是为什么在 iphoneX 这样的机型上比较明显？？？

```js
// pagination.js
  refresh() {
    return this.loader.load(1).then((response) => {
      nx.ConsoleTime.time('renderPagination');
      const target = {
        dataSource: response.items,
        pagination: this.loader.pagination,
        topItems: response.topItems
      };
      nx.forIn(target, (key, value) => {
        wx.nextTick(() => {
          console.log('set key', key);
          this.context.setData({
            [key]: value
          });
        });
      });
      nx.ConsoleTime.timeEnd('renderPagination');
    });
  }
```
