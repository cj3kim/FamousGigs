var Easing     = require('famous/transitions/Easing');
var RenderNode = require('famous/core/RenderNode');
var Modifier   = require('famous/core/Modifier');
var Transform  = require('famous/core/Transform');


module.exports = function (page, obj) {
  var bodyRC = obj.bodyRC;

  page('/developers', function (ctx) {
    var transition = {duration: 200, curve: Easing.inSine };

    bodyRC.show();
  });
}
