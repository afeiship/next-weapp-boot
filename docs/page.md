# nx.Page:
> 对 Page 构造方法的扩展，包含所有的 Page 构造器的功能.

## feature:
- `methods/lifetimes` 分开写
- `methods/lifetimes` 方法会 `merge`，所以，并不能重名
- `lifetimes` 里的方法，不需要加 `on`

## usage:
```js
const delay = (t = 0) => new Promise((resolve) => setTimeout(resolve, t));

nx.Page({
  data: {
    motto: 'Hello World',
    gData: null
  },
  // 事件处理函数
  methods: {
    bindViewTap() {
      wx.navigateTo({
        url: '../logs/index'
      });
    },
    test2() {
      console.log('set global data');
    }
  },
  lifetimes: {
    async load() {
      console.log('page start load');
      await delay()
      console.log('wait 1s, page onload?');
      // 调用应用实例的方法获取全局数据
      nx.$app.getUserInfo((userInfo) => {
        // 更新数据
        this.setData({ userInfo });
      });
    }
  }
});
```
