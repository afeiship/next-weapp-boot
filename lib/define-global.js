module.exports = function(inGlobalData) {
  nx.defineProperty(nx, '$global', {
    set: function(inValue) {
      nx.mix(inGlobalData, inValue);
    },
    get: function() {
      return inGlobalData;
    }
  });
};
