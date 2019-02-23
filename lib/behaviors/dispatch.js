module.exports = Behavior({
  mehthods: {
    $dispatch(inName, inArgs) {
      return this[inName].apply(this, inArgs);
    }
  }
});
