

var View    = require('famous/core/View');
var Surface = require('famous/core/Surface');
var CompanyAd = require('./company_ad');

var React = require('react');
var ReactSurface = require('react-surface');

function LargeAd() {
  View.apply(this, arguments);

  var _this = this;
  this.ad = new ReactSurface({
    classes: ['company-ad']
  });

  this._eventInput.on('reset-ad-details', function (model) {
    _this.setAdContent(model);
  });

  this._node.add(this.ad);

};

LargeAd.prototype = Object.create(View.prototype);
LargeAd.prototype.constructor = View;


LargeAd.prototype.setAdContent = function (model) {
  console.log(model);
  this.ad.setContent(<CompanyAd {...model.attributes} />);
};

module.exports = LargeAd;
