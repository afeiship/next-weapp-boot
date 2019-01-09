var nx = require('next-js-core2');
var createApp = require('./create-app');
var attachNx = require('./middlewares/attach-nx');
var defineGlobal = require('./middlewares/define-global');
var ReduxBoot = require('./middlewares/redux-boot');

nx.App = function(inOptions) {
  var app = createApp(App(inOptions));
  app.use(attachNx);
  app.use(defineGlobal);
  app.use(ReduxBoot);
  return app;
};

module.exports = nx.App;
