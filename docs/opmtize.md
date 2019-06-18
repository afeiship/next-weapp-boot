# optmize

~~~
原来的版本框架，存在性能问题
原因出在以下几个地方：
~~~

1. `component/page` 都会 `subscribe redux` 的 `store` 即全局的 `store`
2. 那么这样就意味着，随着页面组件的增多， `store` 里的 `liseners` 会越来越多
3. 越来越多的 `listeners` 多，会导致频繁的调用小程序端的 `setData` ，这个本来就有性能问题(因为其实本质是走的 `webview-bridge` 这个思路)
4. `webview-bridge` 会涉及多端，多层API调用，性能必然不好
5. 所以这里有以下优化思路
   1. `$connect`，这个是组件内部的，当 `page hide/unload` 等状态的时候，都把 `$connect` 给重置为 false.
      1. 只有当 `$connect` 为 `true` 的时候，组件的 `subscribe` 才会被调用。
      2. 这里 `unsubscribe` 的时机原来都有考虑，而且行为都是正确的，所以不用优化
   2. 因为大部分组件用到 `memory` 的时候，都只需要渲染一次，就类似 `React` 里的 `PureComponents` 的感觉，这里，我把它叫做 `pureComponents`
   3. 这里有和 `react` 有所不同，当然后续也可以类似思路设计，这里只需要传入小程序的数组即可。
      ```js
      pureComponents: [
        'tu-chart',
        'tu-timeline',
        'tu-space',
        'tu-info',
        'tu-article-banner',
        'tu-wx-parse',
        'tu-opacity-formid',
        'tu-legend-list',
        'ec-canvas',
        'pages'
      ]
      ```
    1. 这里的 `pureCompnents` 采用异步 debounce 方式去渲染，这可以保证很多组件多次重复渲染的情况
       1. 这里通过 uuid： context.__wxExparserNodeId__ 来找到同一个对象
       2. 通过 `debounce` 的思路保持最后一次被执行
       3. `asyncInterval` 这个设置为小程序的 `setTimeout` 渲染时间
       4. 因为 `memory` 都是一个完整的对象，所以，能保证最后一次，就是最新的状态

## 其它坑
~~~
解决这个问题过程中出现的其它问题
有些解决方案并不完美
~~~

1. 为什么不能全部用异步？
   1. 全部用异步速度会更加的快，这个是优点
   2. 缺点在于：`nx.$memory` 取数据的时候，数据并不是最新的，因为 `setTimeout` 要排队
2. 授权页：
   1. 这个页面有个比较特殊的逻辑在于， index 加载有一段时间，但是 `authorize` 弹出来了。
   2. 这里： 
      ```js
      // page hide;
      index.$connect = false; 

      //page show
      authorize.$connect = true; 
      ```
   3. 解决思路如下：
      ```js
        load(path) {
          setTimeout(() => {
            this.checkAuthSetting('userInfo').then((res) => {
              if (!res) {
                $route.to('redirect-wx-authorize');
              }
            });
          }, 1000);
        }
      ```
   4. 其它思路： 把 `authorize` 做成弹出层就行了。用 `page` 必然会导致这样的问题出现。

## 潜在问题
1. 可能有部分数据不同步的情况
   - 用户信息，一般会认为是个静态的信息，所以，如果在 mime 页面更新了信息
   - 但用到的页面，已经隐藏了，并不会更新对应的信息
   - 这个时候，可以采用 event.emit 方式先解决

## 其它优化方案
- 把动态、静态数据分开(static/data)，静态的可以针对比较大的数据，动态数据，是必须 动态设置的情况
