var nx = require('next-js-core2');

nx.App = function (inOptions) {
    App(inOptions);
    nx.wxAppInstance = nx.GLOBAL.getApp();
    nx.wxGlobalData = nx.wxAppInstance.globalData;
    return nx.wxAppInstance;
};

module.exports = nx.App;