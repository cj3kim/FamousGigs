var Engine     = require('famous/core/Engine');
var Developers = require('../collections/singleton/developers');
var DeveloperAd = require('../views/DeveloperAd');
var ScrollView = require('famous/views/ScrollView');
var FlexGrid = require('../views/FlexGrid');
var page = require('page');

var Promise = require('bluebird');

var flexGrid = new FlexGrid({
  marginTop:  20,
  marginSide: 0,
  gutterCol:  0,
  gutterRow:  40,
  itemSize: [320,500],
});

var scrollview = new ScrollView();

Engine.pipe(scrollview);
scrollview.sequenceFrom([flexGrid]);

var developersPromise = Promise.resolve(Developers.fetch());
var surfaces = [];

developersPromise
  .then(function () {
    var models = Developers.models;
    for (var i = 0; i < models.length; i++) {
      var model = models[i];
      var devSurface = DeveloperAd(model);
      surfaces.push(devSurface);
    }
    flexGrid.sequenceFrom(surfaces);
    flexGrid.resizeFlow(flexGrid._cachedWidth);
  });

flexGrid.sequenceFrom(surfaces);

module.exports = scrollview;
