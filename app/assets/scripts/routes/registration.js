var Engine     = require('famous/core/Engine');
var Easing     = require('famous/transitions/Easing');
var ScrollView = require('famous/views/ScrollView');

var RenderNode = require('famous/core/RenderNode');
var Modifier   = require('famous/core/Modifier');
var Transform  = require('famous/core/Transform');

var Registration = require('../views/registration/index');

module.exports = function (page, obj) {
  var bodyRC = obj.bodyRC;
  var registration = new Registration();


  var renderNode = new RenderNode();
  var offsetMod = new Modifier({
    transform: Transform.translate(0,30,0)
  })
  renderNode.add(offsetMod).add(registration);


  page('/registration', function (ctx) {
    var transition = {duration: 200, curve: Easing.inSine };
    bodyRC.show(renderNode);
  });
};
