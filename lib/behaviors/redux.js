module.exports = {
  data: {
    state: {}
  },
  attached() {
    this.state = nx.$memory(nx.$app.initialState());
    this.unsubscribe = store.subscribe(() => {
      this.setData({
        state: nx.$memory
      });
    });
  },
  detached() {
    this.unsubscribe();
  }
};
