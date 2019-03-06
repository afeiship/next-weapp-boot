module.exports = function(inOptions) {
  var options = inOptions || {};
  nx.mix(options, {
    externalClasses: ['class-name']
  });
};
