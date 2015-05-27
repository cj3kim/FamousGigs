var Easing     = require('famous/transitions/Easing');
var RenderNode = require('famous/core/RenderNode');
var Modifier   = require('famous/core/Modifier');
var Transform  = require('famous/core/Transform');

var localizedScroll = require('../views/ScrollTech');

var genWorks = require('../starters/works');
var Works = genWorks();


module.exports = function (page, obj) {
  var bodyRC = obj.bodyRC;

  var container = localizedScroll(Works);
  page('/', function (ctx) {
    var transition = {duration: 300, curve: Easing.inSine };

    bodyRC.show(container);
  });
};
