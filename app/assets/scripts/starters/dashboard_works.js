var Engine     = require('famous/core/Engine');
var ScrollView = require('famous/views/ScrollView');
var FlexGrid = require('../views/FlexGrid');

var page = require('page');
var Promise = require('bluebird');
var Work = require('../views/work/index');
var user = require('../models/singleton/user');

var flexGrid = new FlexGrid({
  marginTop:  20,
  marginSide: 0,
  gutterCol:  0,
  gutterRow:  40,
  itemSize: [320,500],
});

var scrollview = new ScrollView();
Engine.pipe(scrollview);

var surfaces = [];
scrollview.flexGrid = flexGrid;
scrollview.surfaces = surfaces;

scrollview.sequenceFrom([flexGrid]);
flexGrid.sequenceFrom(surfaces);

scrollview.loadWorks = function () {
  surfaces = [];
  var promise = Promise.resolve(user.works.fetch());

  return promise
    .then(function () {
      var models = user.works.models;
      for (var i = 0; i < models.length; i++) {
        var model = models[i];
        var workSurface = new Work(model.get('media_type'), model, true);
        surfaces.push(workSurface);
      }
      flexGrid.sequenceFrom(surfaces);
      flexGrid.resizeFlow(flexGrid._cachedWidth);

      return Promise.resolve(surfaces);
    });
};


module.exports = scrollview;
