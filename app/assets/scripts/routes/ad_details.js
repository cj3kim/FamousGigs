var ContainerSurface = require('famous/surfaces/ContainerSurface');
var Easing     = require('famous/transitions/Easing');
var ScrollView = require('famous/views/ScrollView');

var RenderNode = require('famous/core/RenderNode');
var Modifier   = require('famous/core/Modifier');
var Transform  = require('famous/core/Transform');

module.exports = function (page, obj, companyAds) {
  var bodyRC = obj.bodyRC;
  var AdDetails = require('../views/ad-details/index');
  var adDetails = new AdDetails({
    gutterCol: 30,
    gutterRow: 30,
  });

  var adDetailScrollView = new ScrollView();
  adDetailScrollView.sequenceFrom([adDetails]);
  var container = new ContainerSurface();
  container.add(adDetailScrollView);
  container.pipe(adDetailScrollView);

  var renderNode = new RenderNode();
  var offsetMod = new Modifier({
    transform: Transform.translate(0,30,0)
  })
  renderNode.add(offsetMod).add(adDetailScrollView);


  page('/ad-details/:id', function (ctx) {
    var id = ctx.params.id;
    var ad = companyAds.get(id);
    adDetails.trigger('reset-ad-details', ad);

    var transition = {duration: 200, curve: Easing.inSine };
    bodyRC.show(renderNode, transition);
  });
};
