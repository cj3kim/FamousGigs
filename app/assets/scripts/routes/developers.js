var Easing     = require('famous/transitions/Easing');
var RenderNode = require('famous/core/RenderNode');
var Modifier   = require('famous/core/Modifier');
var Transform  = require('famous/core/Transform');

var developerScrollView = require('../starters/developer_ads')();
var DevAbout = require('../views/developer-details/dev_about');


module.exports = function (page, obj) {
  var bodyRC = obj.bodyRC;

  page('/developers', function (ctx) {
    bodyRC.show(developerScrollView);
  });

  var devAbout = new DevAbout();

  page('/developer/:id', function (ctx) {

    bodyRC.show(devAbout);
  });
}
