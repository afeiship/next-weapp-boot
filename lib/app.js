var nx = require('next-js-core2');
var bootstrap = require('./bootstrap');
var attachNx = require('./middlewares/attach-nx');
var defineGlobal = require('./middlewares/define-global');
var ReduxBoot = require('./middlewares/redux-boot');

nx.App = function(inOptions) {
  var app = bootstrap(App(inOptions));
  app.use(attachNx);
  app.use(defineGlobal);
  app.use(ReduxBoot);
  return app;
};

module.exports = nx.App;
