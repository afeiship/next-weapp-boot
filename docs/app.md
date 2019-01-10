# nx.App 
> 对 App 构造方法的扩展，包含所有的 App 构造器的功能.

## feature:
- nx 为全局对象，可以直接调用
- nx.$app : 可以直接取到当前 app 的实例
- nx.$local:  redux 的 memory 级别的属性: set 更新 view
- nx.$memory: redux 的 local 级别的属性: set 更新 view，同时更新 localStorage(Wx 的同步更新方法)
- nx.$global: 这个对应 globalData，是一个全局属性(小程序原生，但并不推荐使用)
