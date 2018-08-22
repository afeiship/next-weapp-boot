var nx = require('next-js-core2');

nx.App = function (inOptions) {
    return App(inOptions);
};

//inject appInstance
nx.wxAppInstance = getApp();
nx.wxGlobalData = nx.wxAppInstance.globalData;

module.exports = nx.App;