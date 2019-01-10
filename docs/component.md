# nx.Component 
> 对 Component 构造方法的扩展，包含所有的 Component 构造器的功能.

## feature:
- 扩展 behavior, 增加 redux/ref 特性的支持
- Observe的支持，小程序已经支持，不推荐使用
- Mixins 支持，
- 自小程序基础库版本 2.2.3 起，组件的的生命周期也可以在 lifetimes 字段内进行声明（这是推荐的方式，其优先级最高）。

## observe:
> 小程序已经扩展，不推荐继续使用
- https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html
- https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/lifetimes.html

~~~
组件的对外属性，是属性名到属性设置的映射表，属性设置中可包含三个字段， type 表示属性类型、 value 表示属性初始值、 observer 表示属性值被更改时的响应函数
~~~

```js
nx.Component({
  properties: {
    className: {
      type: String,
      value: ''
    },
    zIndex: {
      type: Number,
      value: 100
    },
    
  },
  observe: {
    visible: {
      get() {
        return this._value || false;
      },
      set(inValue) {
        this.onVisible(inValue);
        this._value = inValue;
      }
    }
  },
  methods: {
    onVisible(inValue) {
      if (inValue) {
        this.setData({zIndex: 1000})
      } else {
        this.setData({zIndex: -1})
      }
      console.log('visible changed', inValue);
    }
  }
});
```

## mixins:
> 对当前构造器进行扩展
- 每个 item 可以是字符串
- 或者是一个  require 加载的对象集

```js
nx.Component({
  mixins:['mixin1','mixin2', require('next-json')]
});
```
