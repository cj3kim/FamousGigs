// Load polyfills
require('famous-polyfills');

var React = require('react');
var ReactSurface = require('./react_surface');
// import dependencies
var Engine           = require('famous/core/Engine');

var RenderNode       = require('famous/core/RenderNode');
var Surface          = require('famous/core/Surface');
var ContainerSurface = require('famous/surfaces/ContainerSurface');
var ImageSurface = require('famous/surfaces/ImageSurface');

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

var CollectionLayout = require('../../../famous-flex/src/layouts/CollectionLayout');
var FlexScrollView   = require('../../../famous-flex/src/FlexScrollView');

// Create scrollable layout where items have a fixed width/height



var AdDetails = require('./views/ad_details');
var adDetails = new AdDetails();
var adDetailsNode = new RenderNode();

adDetailsNode.add(new StateModifier({transform: Transform.translate(325,60,0)})).add(adDetails);
adDetails.adDetailsNode = adDetailsNode;

// create the main context
var mainContext = Engine.createContext();
mainContext.setPerspective(1000);
mainContext.add(require('./surfaces/navbar_surface'));

var CompanyAdCollection = require('./collections/company_ads');
var companyAds = new CompanyAdCollection();
var CompanyAdView = require('./views/company_ad');

var cmod = new StateModifier({
  inTransition: true,
  outTransition: false,
  overlap: true,
});

var lightbox = new RenderController({
  inTransition: true,
  outTransition: false,
  overlap: true
});

var generateAdSurface = require('./generators/generate_ads')(lightbox, adDetails);

var scrollViewMod = new StateModifier({
  transform: Transform.translate(325, 50, 0)
});

var scrollView = new FlexScrollView({
  layout: CollectionLayout,
  layoutOptions: {
    itemSize: [262, 300],    // item has width and height of 100 pixels
    margins: [10, 10, 10, 10], // outer margins
    spacing: [15, 20],        // spacing between items
    screenSizeOffset: [-325, 0],
  },
  flow: true
});

companyAds.fetch({
  success: function (models) {
    models.each(function(model) {
      var rn = generateAdSurface(model);
      scrollView.push(rn);
    });
  },
  error:   function (err) {
    console.log(err);
  }
});


var container = new ContainerSurface();
container.add(scrollView);
container.pipe(scrollView);

mainContext.add(scrollViewMod).add(container);



mainContext.add(cmod).add(lightbox);

