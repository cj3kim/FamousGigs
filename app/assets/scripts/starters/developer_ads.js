var Engine     = require('famous/core/Engine');
var ScrollView = require('famous/views/ScrollView');
var FlexGrid = require('../views/FlexGrid');
var page = require('page');
var Developers = require('../collections/singleton/developers');
var DeveloperAd = require('../views/DeveloperAd');

var Promise = require('bluebird');

var flexGrid = new FlexGrid({
  marginTop:  20,
  marginSide: 0,
  gutterCol:  40,
  gutterRow:  40,
  itemSize: [250, 300],
});

var scrollview = new ScrollView();
Engine.pipe(scrollview);
scrollview.sequenceFrom([flexGrid]);

scrollview.loadDevs = function () {
  var surfaces = [];
  var models = Developers.models;
  for (var i = 0; i < models.length; i++) {
    var model = models[i];
    var devSurface = DeveloperAd(model);
    surfaces.push(devSurface);
  }
  flexGrid.sequenceFrom(surfaces);
};


var developersPromise = Promise.resolve(Developers.fetch());

developersPromise
  .then(function () {
    scrollview.loadDevs();
    //console.log('devs loaded');
  });


module.exports = scrollview;
