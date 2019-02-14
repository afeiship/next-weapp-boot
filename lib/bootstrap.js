module.exports = function(inApp) {
  var app = nx.GLOBAL.getApp();
  app.use = function(inMiddleware, inOptions) {
    return inMiddleware(app, inOptions);
  };
  return app;
};
