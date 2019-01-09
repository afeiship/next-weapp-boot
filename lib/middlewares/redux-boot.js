var createStore = require('redux').createStore;
var bindActionCreators = require('redux').bindActionCreators;
var NxWeappStore = require('next-weapp-store');
const States = require('next-weapp-redux-base').states;
const Actions = require('next-weapp-redux-base').actions;
const Reducers = require('next-weapp-redux-base').reducers;
const DEFAULT_PREFIX = { prefix: 'nrrx' };

var ReduxBoot = nx.declare({
  statics: {
    _instance: null,
    run: function(inApp, inOptions) {
      //module.hot must create every time:
      const instance = (this._instance = new this(inApp, inOptions));
      return instance;
    },
    initialState: function() {
      return this._instance._app.initialState(NxWeappStore);
    }
  },
  properties: {
    memory: {
      set: function(inValue) {
        this._$actions.setMemory(inValue);
      },
      get: function() {
        return States.getMemory(this._store);
      }
    },
    local: {
      set: function(inValue) {
        this._$actions.setLocal(inValue);
      },
      get: function() {
        return States.getLocal();
      }
    }
  },
  methods: {
    init: function(inApp, inOptions) {
      this._app = inApp;
      this._options = inOptions || DEFAULT_PREFIX;
      this._store = createStore(this.reducers.bind(this));
      this._$actions = bindActionCreators(Actions, this._store.dispatch);
      this.export();
    },
    export: function() {
      nx.each(
        this.__properties__,
        function(key, value) {
          var descriptor = {
            get: value.get.bind(this),
            set: value.set.bind(this)
          };
          nx.defineProperty(nx, `$${key}`, descriptor);
        },
        this
      );
    },
    reducers: function(inState, inAction) {
      NxWeappStore.config(this._options.prefix);
      const initialState = this._app.initialState(NxWeappStore);
      return Reducers(inState || initialState, inAction, this._options);
    },
    subscribe: function() {
      var self = this;
      this._store.subscribe(function() {
        self.state = States.getMemory(self._store);
      });
    }
  }
});

module.exports = function(inApp, inOptions) {
  return ReduxBoot.run(inApp, inOptions);
};
