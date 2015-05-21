var Easing     = require('famous/transitions/Easing');
var RenderNode = require('famous/core/RenderNode');
var Modifier   = require('famous/core/Modifier');
var Transform  = require('famous/core/Transform');

var Works = require('../starters/works')

module.exports = function (page, obj) {
  var bodyRC = obj.bodyRC;

  page('/', function (ctx) {
    var transition = {duration: 300, curve: Easing.inSine };
    bodyRC.show(Works, function () {
      //Works.loadWorks();
    });
  });
};
