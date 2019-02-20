var nx = require('next-js-core2');
var bootstrap = require('./bootstrap');
var attachNx = require('./middlewares/attach-nx');
var defineGlobal = require('./middlewares/define-global');
var reduxBoot = require('./middlewares/redux-boot');
var eventEmitter = require('./middlewares/event-emitter');

nx.App = function(inOptions) {
  var config = inOptions.$config || {};
  var app;
  delete inOptions.$config;

  app = bootstrap(App(inOptions));
  app.use(eventEmitter, config);
  app.use(attachNx, config);
  app.use(defineGlobal, config);
  app.use(reduxBoot, config);
  return app;
};

module.exports = nx.App;
