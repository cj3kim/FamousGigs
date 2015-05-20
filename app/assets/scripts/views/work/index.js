var Engine     = require('famous/core/Engine');
var ScrollView = require('famous/views/ScrollView');
var FlexGrid = require('../../views/FlexGrid');
var VideoSurface = require('famous/surfaces/VideoSurface');
var Surface = require('famous/core/surface');
var page = require('page');
var Easing = require('famous/transitions/Easing');
var LightBox = require('famous/views/LightBox');
var Transform = require('famous/core/Transform');
var RenderNode = require('famous/core/RenderNode');
var Modifier = require('famous/core/Modifier');
var genExitBtn = require('./delete');


var genVideo = require('./video');
var genImage = require('./image');
var genHire  = require('./hire');

//This is a backbone model
module.exports = function (type, model) {
  var dashboard = arguments[2];// boolean

  var lightbox = new LightBox({
    inTransform: Transform.translate(38,100,0),
    outTransform: Transform.translate(38,100,0),
    inTransition:  {duration: 500, curve: Easing.outBounce },
    outTransition: {duration: 300, curve: Easing.inBounce },
    inAlign: [0,0],
    outAlign: [0,0],
    showAlign: [0,0],
    showOrigin:[0,0]
  });

  var renderNode = new RenderNode();
  var surface;
  var url = model.get('url');
  var lightboxNode = dashboard ? genExitBtn(model): genHire(model.get('user_id'));

  var options = {
    url: url,
    lightboxNode: lightboxNode,
    lightbox: lightbox
  };

  switch (type) {
    case 'mov':
      surface = genVideo(options);
      break;
    case 'png':
      surface = genImage(options);
      break;
    case 'jpeg':
      surface = genImage(options);
      break;
    case 'gif':
      surface = genImage(options);
      break;
    default:
      throw new Error('undefined media type');
  }

  renderNode.add(surface);
  renderNode.add(lightbox);

  return renderNode;
}
