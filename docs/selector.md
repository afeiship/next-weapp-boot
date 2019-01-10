## nx.$
> 可以使用 nx.$('ref1') 来选择一个实例; 可以用，不要滥用，大量使用会有内存问题

## feature:
- nx.$ 是一个选择器，可以选择组件实例
- 组件上需要添加对应的字符串 ref 属性

## usage:
```html
<user ref="user1" avatarUrl="{{userInfo.avatarUrl}}" nickName="{{userInfo.nickName}}"></user>
```

```js
nx.$('user1')
```
