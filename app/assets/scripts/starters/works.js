var Engine     = require('famous/core/Engine');
var Developers = require('../collections/singleton/developers');
var DeveloperAdComponent = require('../react_views/components/developer_ad');
var ScrollView = require('famous/views/ScrollView');
var FlexGrid = require('../views/FlexGrid');
var VideoSurface = require('famous/surfaces/VideoSurface');
var Surface = require('famous/core/surface');

var Works = require('../collections/singleton/works');
var Work = require('../views/work/index');

var React = require('react');
var ReactSurface = require('react-surface');
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

var worksPromise = Promise.resolve(Works.fetch());
var surfaces = [];

worksPromise
  .then(function () {
    var models = Works.models;
    for (var i = 0; i < models.length; i++) {
      var model = models[i];
      var workSurface = Work(model.get('media_type'), model);
      surfaces.push(workSurface);
    }
    flexGrid.sequenceFrom(surfaces);
    flexGrid.resizeFlow(flexGrid._cachedWidth);
  });

flexGrid.sequenceFrom(surfaces);

module.exports = scrollview;
