var View = require('famous/core/View');
var Surface = require('famous/core/surface');
var VideoSurface = require('famous/surfaces/VideoSurface');
var RenderNode = require('famous/core/RenderNode');
var Modifier = require('famous/core/Modifier');
var StateModifier = require('famous/modifiers/StateModifier');
var Transform = require('famous/core/Transform');
var LightBox = require('famous/views/LightBox');

var Easing = require('famous/transitions/Easing');

module.exports = function (videoLink) {
  var renderNode = new RenderNode();
  var videoSurface    = new VideoSurface({});

  var lb = new LightBox({
    inTransform: Transform.translate(38,100,0),
    outTransform: Transform.translate(38,100,0),
    inTransition:  {duration: 500, curve: Easing.outBounce },
    outTransition: {duration: 300, curve: Easing.inBounce },
    inAlign: [0,0],
    outAlign: [0,0],
    showAlign: [0,0],
    showOrigin:[0,0]
  });

  var hireMod = new Modifier({
    transform: Transform.translate(270, 535, 0)
  });

  var hire = new Surface({
    size: [72, 40],
    classes:['hire'],
    content: "<span>Hire</span>",
  });

  var hireNode = new RenderNode();
  hireNode.add(hireMod).add(hire);

  renderNode.add(videoSurface)
  renderNode.add(lb);

  videoSurface.setContent(videoLink)
  videoSurface.on('click', function () {
    this._element.play();
    lb.show(hireNode);
  });

  //videoSurface.on('ended', function () {
  //});

  return renderNode;
}