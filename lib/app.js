var nx = require('next-js-core2');
var bootstrap = require('./bootstrap');
var attachNx = require('./middlewares/attach-nx');
var defineGlobal = require('./middlewares/define-global');
var reduxBoot = require('./middlewares/redux-boot');
var eventEmitter = require('./middlewares/event-emitter');
var service = require('./middlewares/service');

var AppPageLifetimesProcessor = require('./processors/app-lifetimes');
var AppPageMethodsProcessor = require('./processors/app-methods');

nx.App = function(inOptions) {
  var config = inOptions.$config || {};
  var app;
  delete inOptions.$config;

  // processors:
  AppPageLifetimesProcessor(inOptions);
  AppPageMethodsProcessor(inOptions);

  app = bootstrap(App(inOptions));
  app.use(eventEmitter, config);
  app.use(service, config);
  app.use(attachNx, config);
  app.use(defineGlobal, config);
  app.use(reduxBoot, config);
  return app;
};

module.exports = nx.App;
