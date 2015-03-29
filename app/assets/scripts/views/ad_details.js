
var View        = require('famous/core/View');
var LargeAd     = require('./large_ad');

var Application = require('./application');

var StateModifier    = require('famous/modifiers/StateModifier');
var Transform        = require('famous/core/Transform');


function AdDetails() {
  View.apply(this, arguments);

  this.initialize();
  this.setupEventListeners();
  this.setupPiping();
};

AdDetails.prototype = Object.create(View.prototype);
AdDetails.prototype.constructor = View;

AdDetails.prototype.initialize = function () {
  this.largeAd  = new LargeAd();
  this.application = new Application();

  var applicationStateMod = new StateModifier({
    transform: Transform.translate(525,0, 0)
  });

  this._node.add(this.largeAd);
  this._node.add(applicationStateMod).add(this.application);
};

AdDetails.prototype.setupEventListeners = function () {
  var _this = this;
  this._eventInput.on('reset-ad-details', function (model) {
    _this._eventOutput.emit('reset-ad-details', model)
  });
};

AdDetails.prototype.setupPiping = function () {
  var _this = this;

  _this._eventOutput.pipe(_this.largeAd._eventInput);
};

module.exports = AdDetails;