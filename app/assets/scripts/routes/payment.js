
var Easing = require('famous/transitions/Easing');
var RenderNode = require('famous/core/RenderNode');
var Modifier   = require('famous/core/Modifier');
var Transform  = require('famous/core/Transform');

module.exports = function (page, obj ) {
  var bodyRC = obj.bodyRC;
  var carousel = require('../views/postify')();

  var renderNode = new RenderNode();
  var offsetMod = new Modifier({
    transform: Transform.translate(0,30,0)
  })
  renderNode.add(offsetMod).add(carousel);

  page('/company_ads/payment', function () {
    var transition = { duration: 500, curve: Easing.inQuad };
    bodyRC.show(renderNode, transition,  function () {
      carousel.showFirst();
    });
  });
};

