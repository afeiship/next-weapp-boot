// https://developers.weixin.qq.com/s/7AnW7FmC7J64

/**
https://developers.weixin.qq.com/s/7AnW7FmC7J64
// compA: will auto inject : externalClasses: ['class-name']
nx.Component({
  options: {
    addGlobalClass: true,
  }
})

<view class="p10 compA class-name">compa</view>

// compB
// red compb--xxx
<compa className="xxx"/>
<view class="red">compb</view>
*/
module.exports = function(inOptions) {
  var options = inOptions || {};
  nx.mix(options, {
    externalClasses: ['class-name']
  });
};
