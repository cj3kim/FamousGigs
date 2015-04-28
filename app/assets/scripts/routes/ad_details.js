var Engine     = require('famous/core/Engine');
var Easing     = require('famous/transitions/Easing');
var ScrollView = require('famous/views/ScrollView');
module.exports = function (page, obj, companyAds) {
  console.log(companyAds);
  var bodyRC = obj.bodyRC;

  var AdDetails = require('../views/ad_details');
  var adDetails = new AdDetails({
    gutterCol: 30,
    gutterRow: 30,
  });

  var adDetailScrollview = new ScrollView();

  adDetailScrollview.sequenceFrom([adDetails]);
  Engine.pipe(adDetailScrollview);

  page('/ad-details/:id', function (ctx) {
    var id = ctx.params.id;
    var ad = companyAds.get(id);
    adDetails.trigger('reset-ad-details', ad);

    var transition = {duration: 200, curve: Easing.inSine };
    bodyRC.show(adDetailScrollview, transition);
  });

};
