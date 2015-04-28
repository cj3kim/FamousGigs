// Load polyfills
require('famous-polyfills');

// import dependencies
var Engine           = require('famous/core/Engine');

var Easing           = require('famous/transitions/Easing');
var Transform        = require('famous/core/Transform');

var ScrollView = require('famous/views/ScrollView');

var page = require('page');

var mainContext = Engine.createContext();
mainContext.setPerspective(1000);

var KaollaSu = require('./lib/KaollaSu')(mainContext);
var _computeContextWidth = KaollaSu.computeContextWidth;
var _resizeComputation   = KaollaSu.resizeComputation;

var obj = require('./starters/index')(mainContext);

var sidebar2 = obj.mobileMenu.node;
var menuMod = obj.mobileMenu.mod;
var mainMod = obj.containerShell.mod;
var bodyRC  = obj.bodyRC;
var navbar =  obj.navbar;
var containerShell = obj.containerShell.node;

var searchAry = require('./starters/search')(navbar);
var searchInput    = searchAry[0];
var searchFlexGrid = searchAry[1];
var sfgScrollView  = searchAry[2];
var companyAds     = searchAry[3];


page('/', function () {
  bodyRC.show(sfgScrollView, transition);

  var transition = { duration: 500};
  var lb = sidebar2._lb;
  var backButton = lb._backButton;
  var contextWidth = _computeContextWidth()

  menuMod.setTransform(Transform.translate(-contextWidth,0,0), transition);
  mainMod.setTransform(Transform.translate(0,0,0), transition);
});

page('/mobile-menu', function () {
  var lb = sidebar2._lb;
  var backButton = lb._backButton;
  lb.show(backButton);

  var transition = { duration: 500};
  var contextWidth = _computeContextWidth()
  menuMod.setTransform(Transform.translate(0,0,0), transition);
  mainMod.setTransform(Transform.translate(contextWidth, 0 ,0), transition);
});

var carousel = require('./views/postify')();
page('/company_ads/payment', function () {
  var transition = { duration: 500, curve: Easing.inQuad };
  bodyRC.show(carousel, transition,  function () {
    carousel.showFirst();
  });
});

var AdDetails = require('./views/ad_details');
var adDetails = new AdDetails({
  gutterCol: 30,
  gutterRow: 30,
});
var ad_detail_scrollview = new ScrollView();
ad_detail_scrollview.sequenceFrom([adDetails]);
Engine.pipe(ad_detail_scrollview);

page('/ad-details/:id', function (ctx) {
  var id = ctx.params.id;
  var ad = companyAds.get(id);
  console.log(ad);
  adDetails.trigger('reset-ad-details', ad);

  var transition = {duration: 200, curve: Easing.inSine };
  bodyRC.show(ad_detail_scrollview, transition);
});

page.show('/');


