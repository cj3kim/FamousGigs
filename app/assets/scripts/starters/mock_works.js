var Engine     = require('famous/core/Engine');
var Developers = require('../collections/singleton/developers');
var DeveloperAdComponent = require('../react_views/components/developer_ad');
var ScrollView = require('famous/views/ScrollView');
var FlexGrid = require('../views/FlexGrid');
var VideoSurface = require('famous/surfaces/VideoSurface');
var Surface = require('famous/core/surface');

var React = require('react');
var ReactSurface = require('react-surface');
var page = require('page');

var Promise = require('bluebird');
var Work = require('../views/work');

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
var videoLinks = [
  "http://video.capptivate.co/videos/TimelinesDetail/small_TimelinesDetail.mov",
  "http://video.capptivate.co/videos/TryAgain/small_TimelineMenu.mov",
  "http://video.capptivate.co/videos/SkypeQikMenu/SkypeQikMenu.mov",
  "http://video.capptivate.co/videos/KeezyMenu/KeezyMenu.mov"
];


var surfaces = [];
for (var i = 0; i < videoLinks.length; i++) {
  var workSurface = Work(videoLinks[i]);
  surfaces.push(workSurface);
}

flexGrid.sequenceFrom(surfaces);

module.exports = scrollview;
