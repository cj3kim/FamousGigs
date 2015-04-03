// Load polyfills
require('famous-polyfills');

var React = require('react');
var ReactSurface = require('react-surface');
// import dependencies
var Engine           = require('famous/core/Engine');

var RenderNode       = require('famous/core/RenderNode');
var Surface          = require('famous/core/Surface');
var ContainerSurface = require('famous/surfaces/ContainerSurface');
var ImageSurface     = require('famous/surfaces/ImageSurface');

var Modifier         = require('famous/core/Modifier');
var StateModifier    = require('famous/modifiers/StateModifier');
var Transform        = require('famous/core/Transform');
var Transitionable   = require('famous/transitions/Transitionable');

var EventEmitter     = require('famous/core/EventEmitter');
var Easing           = require('famous/transitions/Easing');
var Timer            = require('famous/utilities/Timer');

var GridLayout       = require('famous/views/GridLayout');
var LightBox         = require('famous/views/LightBox');
var RenderController = require('famous/views/RenderController');

var Entity = require('famous/core/Entity');
var page = require('page');
var mainContext = Engine.createContext();
mainContext.setPerspective(1000);

var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
var headerFooterLayout = new HeaderFooterLayout({
  headerSize: 55 
});
mainContext.add(headerFooterLayout);

var navbar = require('./views/nav_bar');
headerFooterLayout.header.add(navbar);


// Create scrollable layout where items have a fixed width/height

var AdDetails = require('./views/ad_details');
var adDetails = new AdDetails({
  marginTop: 30,
  gutterCol: 50
});

// create the main context
var bodyRC = new RenderController({
  inTransition: true,
  outTransition: false,
  overlap: true
});

headerFooterLayout.content.add(bodyRC);

var dashboard = require('./views/dashboard');

var CompanyAdCollection = require('./collections/company_ads');
var companyAds = new CompanyAdCollection; 

var adScrollPage = require('./pages/ad_scrollpage');

page('/', function () {
  bodyRC.show(adScrollPage);
});


var AdForm = require('./views/ad_form');

var adForm = new AdForm({marginTop: 30 });
page('/company_ads/new', function () {

  bodyRC.show(adForm);
});

page.show('/company_ads/new');


//TODO redo this area of code.
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

page('/ad-details/:id', function (ctx) {
  var id = ctx.params.id;
  var ad = companyAds.get(id);
  adDetails.trigger('reset-ad-details', ad);
  bodyRC.show(adDetails);
});

