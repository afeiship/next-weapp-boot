module.exports = function(inApp) {
  var app = nx.GLOBAL.getApp();
  app.use = function(inMiddleware) {
    return inMiddleware(app);
  };
  return app;
};
