// Load polyfills
require('famous-polyfills');

// import dependencies
var Engine           = require('famous/core/Engine');
var Easing           = require('famous/transitions/Easing');

var RenderNode       = require('famous/core/RenderNode');
var RenderController = require('famous/views/RenderController');
var Entity = require('famous/core/Entity');
var Transform = require('famous/core/Transform');
var Modifier = require('famous/core/Modifier');

var page = require('page');

var mainContext = Engine.createContext();
mainContext.setPerspective(1000);

var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
var headerFooterLayout = new HeaderFooterLayout({
  headerSize: 55 
});
mainContext.add(headerFooterLayout);

// Create scrollable layout where items have a fixed width/height

var AdDetails = require('./views/ad_details');
var adDetails = new AdDetails({
  gutterCol: 50,
  gutterRow: 30
});

// create the main context
var bodyRC = new RenderController({
  overlap: false
});

var mod = new Modifier({
  transform: Transform.translate(0, 30, 0)
});

var navbar = require('./views/nav_bar');
headerFooterLayout.header.add(navbar);

headerFooterLayout.content.add(mod).add(bodyRC);

var dashboard = require('./views/dashboard');

var CompanyAdCollection = require('./collections/company_ads');
var companyAds = new CompanyAdCollection;

var adScrollPage = require('./pages/ad_scrollpage');


page('/', function () {
  var transition = {duration: 1000, curve: Easing.inQuad };
  bodyRC.show(adScrollPage, transition);
});

companyAds.fetch({
  success: function (collection) {
    var models = collection.models;
    for (var i = 0; i < models.length; i += 1) {
      var model = models[i];
      adScrollPage._addSurface(model);
    }
  },
  error: function (models) {
  }
});

//TODO FINISH POSTING FLOW
var AdForm = require('./views/posting_flow/AdForm');
var adForm = new AdForm({});
page('/company_ads/new', function () {
  bodyRC.show(adForm);
});

var PaymentForm = require('./views/posting_flow/PaymentForm');
var paymentForm = new PaymentForm({});

var CompanyDetails = require('./views/posting_flow/CompanyDetails');
var companyDetails =  new CompanyDetails();

var PaymentThanks = require('./views/posting_flow/PaymentThanks');
var paymentThanks = new PaymentThanks();

var Carousel = require('./views/Carousel');
var carousel = new Carousel([adForm, companyDetails, paymentForm, paymentThanks]);

//END POSTING FLOW

page('/company_ads/payment', function () {
  bodyRC.show(carousel, {duration: 1000}, function () {
    carousel.showFirst();
  });
});

var Scrollview = require('famous/views/Scrollview');
var ad_detail_scrollview = new Scrollview();
ad_detail_scrollview.sequenceFrom([adDetails]);
Engine.pipe(ad_detail_scrollview);

page('/ad-details/:id', function (ctx) {
  var id = ctx.params.id;
  var ad = companyAds.get(id);
  adDetails.trigger('reset-ad-details', ad);

  var transition = {duration: 200, curve: Easing.inSine };
  bodyRC.show(ad_detail_scrollview, transition); //Ad Details was built on top of flex columns so transitions don't work because of the custom commit method. 
});

page.show('/');


