
var View        = require('famous/core/View');
var LargeAd     = require('./large_ad');
var Application = require('./application');

var StateModifier    = require('famous/modifiers/StateModifier');
var Transform        = require('famous/core/Transform');

var FlexContent = require('./FlexContent');

function AdDetails() {
  FlexContent.apply(this, arguments);

  this.initialize();
  this.setupEventListeners();
  this.setupPiping();
};

AdDetails.prototype = Object.create(FlexContent.prototype);
AdDetails.prototype.constructor = FlexContent;

AdDetails.prototype.initialize = function () {
  this.largeAd  = new LargeAd();
  this.application = new Application();

  this.createCol(500).addSurfaceToCol(0, this.largeAd);
  this.createCol(300).addSurfaceToCol(1, this.application);
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
