module.exports = function(inGlobalData) {
  nx.defineProperty(nx, '$global', {
    set: function(inValue) {
      nx.each(inValue, function(key, value) {
        nx.set(inGlobalData, key, value);
      });
    },
    get: function() {
      return inGlobalData;
    }
  });
};
