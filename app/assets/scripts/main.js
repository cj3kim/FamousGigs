// Load polyfills
require('famous-polyfills');

// import dependencies
var Engine           = require('famous/core/Engine');

var RenderNode       = require('famous/core/RenderNode');
var Surface          = require('famous/core/Surface');
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



var CollectionLayout = require('../../../famous-flex/src/layouts/CollectionLayout');
var FlexScrollView   = require('../../../famous-flex/src/FlexScrollView');

// Create scrollable layout where items have a fixed width/height
var scrollView = new FlexScrollView({
  layout: CollectionLayout,
  layoutOptions: {
    itemSize: [100, 100],    // item has width and height of 100 pixels
    margins: [10, 5, 10, 5], // outer margins
    spacing: [10, 10]        // spacing between items
  },
  dataSource: [
    new Surface({content: 'item 1'}),
    new Surface({content: 'item 2'}),
    new Surface({content: 'item 3'})
  ]
});


var fs = require('fs');
// create the main context
var mainContext = Engine.createContext();
var $ = require('zepto-browserify').$;
var $template = $(fs.readFileSync( __dirname + '/templates/navbar.html', 'utf8'));

var NavbarView = require('./views/navbar');
var navbarView = new NavbarView();

var navbarMod = new Modifier();
var navbarSurface = new Surface({
  size: [300, undefined],
  content: navbarView.$el[0],
  properties: {
    backgroundColor: '#0a3650'
  }
});

var stateModifier = new StateModifier({
  transform: Transform.translate(350, 50, 0)
});

var CompanyAdCollection = require('./collections/company_ads');
var companyAds = new CompanyAdCollection();
var CompanyAdView = require('./views/company_ad');

var grid = new GridLayout({
  dimensions: [8,8]
});
var surfaces = []
var showing;
grid.sequenceFrom(surfaces);

var cmod = new StateModifier({
  inTransition:  true,
  outTransition: false,
  overlap: true
});

var controller = new LightBox({
  inTransition: true,
  outTransition: false,
  overlap: true
});
controller.hide();

companyAds.fetch({
  success: function (models) {
    models.each(function(model) {
      var companyAdView = new CompanyAdView({model: model});
      var newSurface = new Surface({
        size: [262, 300],
        classes: ['company_ad'],
        content: companyAdView.$el[0]
      });

      mainContext.add(stateModifier).add(newSurface);
    });
  },
  error:   function (err) {
    console.log(err);
  }
});

mainContext.add(navbarSurface)

var stateModifier2 = new StateModifier({
  transform: Transform.translate(600, 50, 0)
});


mainContext.add(stateModifier2).add(scrollView);



