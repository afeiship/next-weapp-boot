module.exports = Behavior({
  properties: {
    state: {
      type: Object,
      value: {}
    }
  },
  attached() {
    this.data.state = nx.$app.initialState();
    this.unsubscribe = nx.$app.store.subscribe(() => {
      this.setData({ state: nx.$memory });
    });
  },
  detached() {
    this.unsubscribe();
  }
});
