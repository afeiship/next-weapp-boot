module.exports = function(inApp) {
  inApp.use = function(inMiddleware) {
    return inMiddleware(inApp);
  };
  return inApp;
};
