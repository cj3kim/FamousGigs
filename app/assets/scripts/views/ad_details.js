var View        = require('famous/core/View');
var LargeAd     = require('./large_ad');
var Application = require('./application');

var StateModifier    = require('famous/modifiers/StateModifier');
var Transform        = require('famous/core/Transform');

var FlexColumns = require('./flex-columns/flex-columns');

var Surface = require('famous/core/Surface');

function AdDetails() {

  FlexColumns.apply(this, arguments);

  this.initialize();
  this.setupEventListeners();
  this.setupPiping();
};

AdDetails.prototype = Object.create(FlexColumns.prototype);
AdDetails.prototype.constructor = FlexColumns;

AdDetails.prototype.initialize = function () {
  this.largeAd  = new LargeAd();
  this.application = new Application();

  this.createCol(500).addColNode(0, this.largeAd, [500, true]);
  this.createCol(300).addColNode(1, this.application, [265, 420]);

  //var s = new Surface({
    //properties: {
      //backgroundColor: 'red'
    //}
  //});
  //var b = new Surface({
    //properties: {
      //backgroundColor: 'blue'
    //}
  //});

  //this.addColNode(1, b, [200, 200]);
  //this.createCol(200).addColNode(2,s, [100,100] );
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
