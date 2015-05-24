var ScrollView = require('famous/views/Scrollview');
var FlexGrid = require('../views/FlexGrid');
var page = require('page');
var Developers = require('../collections/singleton/developers');
var DeveloperAd = require('../views/DeveloperAd');
var ContainerSurface = require('famous/surfaces/ContainerSurface');

var Promise = require('bluebird');


var flexGrid = new FlexGrid({
  marginTop:  20,
  marginSide: 0,
  gutterCol:  40,
  gutterRow:  40,
  itemSize: [250, 300],
});

var container = new ContainerSurface();
var scrollview = new ScrollView();
container.add(scrollview);
container.pipe(scrollview);


scrollview.sequenceFrom([flexGrid]);

container.loadDevs = function () {
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
    container.loadDevs();
    //console.log('devs loaded');
  });


module.exports = container;
