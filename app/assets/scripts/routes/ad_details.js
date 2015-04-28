var Engine     = require('famous/core/Engine');
var Easing     = require('famous/transitions/Easing');
var ScrollView = require('famous/views/ScrollView');

var RenderNode = require('famous/core/RenderNode');
var Modifier   = require('famous/core/Modifier');
var Transform  = require('famous/core/Transform');

module.exports = function (page, obj, companyAds) {
  var bodyRC = obj.bodyRC;

  var AdDetails = require('../views/ad_details');
  var adDetails = new AdDetails({
    gutterCol: 30,
    gutterRow: 30,
  });

  var adDetailScrollview = new ScrollView();

  adDetailScrollview.sequenceFrom([adDetails]);
  Engine.pipe(adDetailScrollview);

  var renderNode = new RenderNode();

  var offsetMod = new Modifier({
    transform: Transform.translate(0,30,0)
  })
  renderNode.add(offsetMod).add(adDetailScrollview);


  page('/ad-details/:id', function (ctx) {
    var id = ctx.params.id;
    var ad = companyAds.get(id);
    adDetails.trigger('reset-ad-details', ad);

    var transition = {duration: 200, curve: Easing.inSine };
    bodyRC.show(renderNode, transition);
  });
};
