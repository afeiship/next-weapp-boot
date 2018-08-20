# page:

## usage:
1. $watch
```js
nx.Component({
  properties: {
    className: {
      type: String,
      value: ''
    },
    visible: {
      type: Boolean,
      value: false
    },
    zIndex: {
      type: Number,
      value: 100
    },
    $watch: {
      type: Object,
      value: {
        visible: {
          get() {
            return this._value || false;
          },
          set(inValue) {
            console.log(this);
            console.log('set!!');
            this.testMethod();
            this._value = inValue;
          }
        }
      }
    }
  },
  methods: {
    testMethod() {
      console.log('method1', this);
    }
  }
});
```