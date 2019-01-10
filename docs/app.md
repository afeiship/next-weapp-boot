# nx.App 
> 对 App 构造方法的扩展，包含所有的 App 构造器的功能.

## feature:
- nx 为全局对象，可以直接调用
- nx.$app : 可以直接取到当前 app 的实例
- nx.$local:  redux 的 memory 级别的属性: set 更新 view
- nx.$memory: redux 的 local 级别的属性: set 更新 view，同时更新 localStorage(Wx 的同步更新方法)
- nx.$global: 这个对应 globalData，是一个全局属性(小程序原生，但并不推荐使用)

## 初始化 redux 状态
```js
import { $storage } from '#';
import 'next-weapp-boot';

nx.App({
  initialState(inStorage) {
    return {
      memory: {
        test: 123
      },
      local: {
        testloca: 'str',
        obj: { test: 'sdfdf' }
      }
    };
  },
  onLaunch() {
    console.log(nx, nx.VERSION, $storage);
    // 调用API从本地缓存中获取数据
    nx.GLOBAL.$storage = $storage;
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
  },
  getUserInfo(cb) {
    if (this.globalData.userInfo) {
      typeof cb === 'function' && cb(this.globalData.userInfo);
    } else {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.globalData.userInfo = res.userInfo;
              typeof cb === 'function' && cb(this.globalData.userInfo);
            }
          });
        }
      });
    }
  },
  globalData: {
    test: 123,
    userInfo: null
  }
});
```
