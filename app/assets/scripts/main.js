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
  gutterCol: 50
});

// create the main context
var bodyRC = new RenderController({
  inTransition: true,
  outTransition: false,
  overlap: true
});


var adScrollPage = require('./pages/ad_scrollpage')(bodyRC, adDetails);
headerFooterLayout.content.add(bodyRC);

//Profile stuff

var dashboard = require('./views/dashboard');

page('/', function () {
  bodyRC.show(adScrollPage);
});

page.show('/');

page('/ad-details', function () {

});


