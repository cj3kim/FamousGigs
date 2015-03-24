// Load polyfills
require('famous-polyfills');

var React = require('react');
var ReactSurface = require('./react_surface');
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

var mainContext = Engine.createContext();
mainContext.setPerspective(1000);


var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
var headerFooterLayout = new HeaderFooterLayout();

headerFooterLayout.header.add()
headerFooterLayout.content.add();
mainContext.add(headerFooterLayout);

// Create scrollable layout where items have a fixed width/height

var AdDetails = require('./views/ad_details');
var adDetails = new AdDetails();

// create the main context
var bodyRC = new RenderController({
  inTransition: true,
  outTransition: false,
  overlap: true
});


var adScrollPage = require('./pages/ad_scrollpage')(bodyRC, adDetails);

adScrollPage.companyAds.fetch({
  success: function (models) {
    models.each(function(model) {
      var rn = adScrollPage.generateAdSurface(model);
      adScrollPage.scrollView.push(rn);
    });
  },
  error:   function (err) {
    console.log(err);
  }
});

headerFooterLayout.content.add(bodyRC);

bodyRC.show(adScrollPage);





