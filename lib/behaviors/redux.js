module.exports = {
  data: {
    state: {}
  },
  attached() {
    if (this.$options.connect) {
      this.state = memory(app.initialState());
      this.unsubscribe = store.subscribe(() => {
        // this.state = memory();
        // this.setData({
        //   state: nx.$memory
        // });
      });
    }
  },
  detached() {
    this.unsubscribe();
  }
};
