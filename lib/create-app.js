module.exports = function(inApp) {
  var app = nx.GLOBAL.getApp();
  app.use = function(inMiddleware) {
    return inMiddleware(inApp);
  };
  return app;
};
