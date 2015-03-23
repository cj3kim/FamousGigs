
var View        = require('famous/core/View');
var LargeAd     = require('./large_ad');

var Application = require('./application');

var StateModifier    = require('famous/modifiers/StateModifier');
var Transform        = require('famous/core/Transform');


function AdDetails() {
  View.apply(this, arguments);

  this.initialize();
  this.setupEventListeners();
};

AdDetails.prototype = Object.create(View.prototype);
AdDetails.prototype.constructor = View;

AdDetails.prototype.initialize = function () {
  this.largeAd  = new LargeAd();
  this.application = new Application();

  var applicationStateMod = new StateModifier({
    transform: Transform.translate(600,0, 0)
  });

  this._node.add(this.largeAd);
  this._node.add(applicationStateMod).add(this.application);
};

AdDetails.prototype.setupEventListeners = function () {
  this._eventInput.on('reset-ad-details', function (models) {

  });

};

module.exports = AdDetails;
