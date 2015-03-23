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

var fs = require('fs');
// create the main context
var mainContext = Engine.createContext();
mainContext.setPerspective(1000);


var NavbarView = require('./views/navbar');

var navbarMod = new Modifier();

var navbarSurface = new ReactSurface({
  size: [300, undefined],
  content: <NavbarView />,
  properties: {
    backgroundColor: '#0a3650'
  }
});

var CompanyAdCollection = require('./collections/company_ads');
var companyAds = new CompanyAdCollection();
var CompanyAdView = require('./views/company_ad');

var lightbox = new RenderController({
  inTransition: true,
  outTransition: false,
  overlap: true
});


var surfaces = [];

function createSurface(model) {

  var newSurface = new ReactSurface({
    classes: ['company-ad'],
    content: <CompanyAdView {...model.attributes} />
  });

  surfaces.push(newSurface);

  var renderNode = new RenderNode();
  var rc = new RenderController();

  var surfaceStateMod = new StateModifier({
    size: [262, 300],
  });

  newSurface._rc = rc;
  newSurface._sm = surfaceStateMod

  renderNode.add(surfaceStateMod).add(rc);
  rc.show(newSurface);

  newSurface.on('click', function () {
    var outTransitionObj = {curve: Easing.outElastic, duration: 1000 }

    for (var i = 0; i < surfaces.length; i += 1) {
      var s = surfaces[i];
      s._rc.hide();
    }
    cmod.setTransform(Transform.translate(0,0, 0.0001));

    lightbox.show(adDetailsNode);
  });

  return renderNode;
}

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
      var rn = createSurface(model);
      scrollView.push(rn);

    });
  },
  error:   function (err) {
    console.log(err);
  }
});
mainContext.add(navbarSurface)

var scrollViewMod = new StateModifier({
  transform: Transform.translate(325, 50, 0)
});

var container = new ContainerSurface();
container.add(scrollView);
container.pipe(scrollView);

mainContext.add(scrollViewMod).add(container);

var cmod = new StateModifier({
  inTransition: true,
  outTransition: false,
  overlap: true,
});

mainContext.add(cmod).add(lightbox);

