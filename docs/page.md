# page:

## usage:
> Observe properies:

- $observe
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
