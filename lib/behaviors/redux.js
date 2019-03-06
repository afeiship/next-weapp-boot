module.exports = Behavior({
  properties: {
    memory: {
      type: Object,
      value: {}
    },
    local: {
      type: Object,
      value: {}
    }
  },
  lifetimes: {
    attached() {
      this._$unsubscribe = nx.$app.subscribe(this);
    },
    detached() {
      this._$unsubscribe();
    }
  }
});
