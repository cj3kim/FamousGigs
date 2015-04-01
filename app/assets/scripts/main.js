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

var mainContext = Engine.createContext();
mainContext.setPerspective(1000);

var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
var headerFooterLayout = new HeaderFooterLayout({
  headerSize: 68
});


var FlexNavbar = require('./views/flex_navbar');
var flexNavbar = new FlexNavbar();
var containerSurface = new ContainerSurface({
  size: [undefined, 56],
  properties: {
    backgroundColor: '0d283f'
  }
});
containerSurface.add(flexNavbar);

headerFooterLayout.header.add(containerSurface);


var postSurface = new Surface({
  size: [61, 56],
  classes: ['flex-navbar', 'left'],
  content: "<span class='menu-item flaticon-sheet3'></span>",
});

var menuSurface = new Surface({
  size: [61, 56],
  classes: ['flex-navbar', 'right'],
  content: "<span class='menu-item flaticon-menu55'></span>",
});
var loginSurface = new Surface({
  size: [61, 56],
  classes: ['flex-navbar', 'left'],
  content: "<span class='menu-item flaticon-login2'></span>",
});

var leftSurfaces = [menuSurface];
var rightSurfaces = [loginSurface, postSurface];

var dock = {
  left: leftSurfaces,
  right: rightSurfaces
};

flexNavbar.linkDock(dock);

mainContext.add(headerFooterLayout);

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

bodyRC.show(adScrollPage);


var FlexColumns = require('flex-columns');

var fc = new FlexColumns({
  gutterCol: 20
});

var ProfileBasics = require('./views/dashboard/profile_basics');
var pb = new ProfileBasics();
var Stats = require('./views/dashboard/stats');
var stats = new Stats();


fc.createCol(450).addSurfaceToCol(0,pb);
fc.createCol(200).addSurfaceToCol(1,stats);

//bodyRC.show(fc);

