var createStore = require('redux').createStore;
var bindActionCreators = require('redux').bindActionCreators;
var NxWeappStore = require('next-weapp-store');
const States = require('next-weapp-redux-base').states;
const Actions = require('next-weapp-redux-base').actions;
const Reducers = require('next-weapp-redux-base').reducers;
const DEFAULT_OPTIONS = {
  prefix: 'nrrx',
  // uuid: '__wxExparserNodeId__',
  pureComponents: [],
  asyncInterval: 500
};

var ReduxBoot = nx.declare({
  statics: {
    _instance: null,
    run: function(inApp, inOptions) {
      return (this._instance = new this(inApp, inOptions));
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
      this._debounceTimer = null;
      this._options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
      this._store = createStore(this.reducers.bind(this));
      this._$actions = bindActionCreators(Actions, this._store.dispatch);
      this.attach();
      this.shortcut();
    },
    shortcut: function() {
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
    attach: function() {
      nx.mix(this._app, {
        subscribe: this.subscribe.bind(this),
        store: this._store,
        getState: this._store.getState.bind(this),
        dispatch: this._store.dispatch.bind(this)
      });
    },
    reducers: function(inState, inAction) {
      NxWeappStore.config(this._options.prefix);
      const initialState = this._app.initialState(NxWeappStore);
      return Reducers(inState || initialState, inAction, this._options);
    },
    subscribe: function(inContext) {
      var self = this;
      this.renderTo(inContext);
      return this._store.subscribe(function() {
        self.renderTo(inContext);
      });
    },
    pureRender: function(inContext) {
      inContext.setData({
        memory: this.memory,
        local: this.local
      });
    },
    renderTo: function(inContext) {
      var self = this;
      var pureComponents = this._options.pureComponents;
      var connected = inContext.$connect;
      if (connected || typeof connected === 'undefined') {
        var type = inContext.is;
        if (
          pureComponents.some(function(item) {
            return type.indexOf(item) > -1;
          })
        ) {
          this._debounceTimer && clearTimeout(this._debounceTimer);
          this._debounceTimer = setTimeout(function() {
            self.pureRender(inContext);
          }, this._options.asyncInterval);
        } else {
          setTimeout(function() {
            self.pureRender(inContext);
          }, 0);
        }
      }
    }
  }
});

module.exports = function(inApp, inOptions) {
  return ReduxBoot.run(inApp, inOptions);
};
