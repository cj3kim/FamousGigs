var Engine     = require('famous/core/Engine');
var ScrollView = require('famous/views/ScrollView');
var FlexGrid = require('../views/FlexGrid');
var page = require('page');
var Works = require('../collections/singleton/works');
var Work = require('../views/work/index');
var Promise = require('bluebird');
var ContainerSurface = require('famous/surfaces/ContainerSurface');

var flexGrid = new FlexGrid({
  marginTop:  20,
  marginSide: 0,
  gutterCol:  0,
  gutterRow:  40,
  itemSize: [320,500],
});

var container = new ContainerSurface();
var scrollview = new ScrollView();

container.add(scrollview);
container.pipe(scrollview);

scrollview.sequenceFrom([flexGrid]);

container.loadWorks = function () {
  var surfaces = [];

  var userId;
  if (arguments.length > 0)
    userId = arguments[0];
  var models = userId ? Works.where({user_id: userId}) : Works.models;

  for (var i = 0; i < models.length; i++) {
    var model = models[i];
    var workSurface = Work(model.get('media_type'), model);
    surfaces.push(workSurface);
  }
  flexGrid.sequenceFrom(surfaces);
};

var worksPromise = Promise.resolve(Works.fetch());

worksPromise
  .then(function () {
    container.loadWorks();
  });


module.exports = container;
