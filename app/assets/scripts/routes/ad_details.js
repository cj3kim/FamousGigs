var ContainerSurface = require('famous/surfaces/ContainerSurface');
var Easing     = require('famous/transitions/Easing');
var ScrollView = require('famous/views/Scrollview');

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

  page('/ad-details/:id', function (ctx) {
    var id = ctx.params.id;
    var ad = companyAds.get(id);
    adDetails.trigger('reset-ad-details', ad);

    var transition = {duration: 200, curve: Easing.inSine };
    bodyRC.show(adDetails, transition);
  });
};
