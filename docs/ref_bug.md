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
10. 总结： wx.navigateTo、wx.reLaunch 会销毁其它页面，跳到 tab 页，这个API没有问题，问题是出在自己的程序上

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


## resources
- https://developers.weixin.qq.com/community/develop/doc/0002e8f689cde03ff7d7909ba51800
- https://www.jianshu.com/p/bf06e3fde97f
- https://www.jianshu.com/p/c95bdffe80bc
- http://www.mamicode.com/info-detail-2161012.html


---
# vdSyncBatch max size 问题分析
> 仔细分析发现，上面的问题，确实会有问题，但并不是问题的根源。
> 因为发现，几乎每个实例都会新创建，所以，componentsMap 会越来越大。

- 这次的问题，有点类似于小程序的某些操作，会出现内存峰值的情况
- `switchTab` ，会销毁掉 `detail` 页，然后加载首页内容
- 首页内容也存在多层嵌套，渲染次数会比较多
- 直接走 `setData` 的逻辑也特别的多
