

var View    = require('famous/core/View');
var Surface = require('famous/core/Surface');

function LargeAd() {
  View.apply(this, arguments);

  var ad = new Surface({
    size: [500, 500],
    classes: ['company-ad']
  });

  this._node.add(ad);

};

LargeAd.prototype = Object.create(View.prototype);
LargeAd.prototype.constructor = View;

module.exports = LargeAd;
