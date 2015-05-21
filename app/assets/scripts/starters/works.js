var Engine     = require('famous/core/Engine');
var ScrollView = require('famous/views/ScrollView');
var FlexGrid = require('../views/FlexGrid');
var page = require('page');
var Works = require('../collections/singleton/works');
var Work = require('../views/work/index');

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

scrollview.loadWorks = function () {
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
    scrollview.loadWorks();
  });


module.exports = scrollview;
