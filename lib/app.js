var nx = require('next-js-core2');
var DEFAULT_DATA = {
    $toast: {},
    $modal: {}
};

nx.App = function (inOptions) {
    App(inOptions);
    nx.wxAppInstance = nx.GLOBAL.getApp();
    nx.wxGlobalData = nx.wxAppInstance.globalData;
    return nx.wxAppInstance;
};

module.exports = nx.App;