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
      this.$connect = true;
      this.$unsubscribe = nx.$app.subscribe(this);
    },
    detached() {
      this.$connect = false;
      this.$unsubscribe();
    }
  },
  pageLifetimes: {
    show() {
      this.$connect = true;
    },
    hide() {
      this.$connect = false;
    }
  }
});
