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



var fs = require('fs');
// create the main context
var mainContext = Engine.createContext();
mainContext.setPerspective(1000);


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


var dataSource = [];

var rc = new LightBox({
  inTransition: true,
  outTransition: false,
  overlap: true
});

function createSurface(model) {
  var companyAdView = new CompanyAdView({model: model});
  var newSurface = new Surface({
    classes: ['company_ad'],
    content: companyAdView.$el[0]
  });
  var renderNode = new RenderNode();

  var _sm = new StateModifier({
    size: [262, 300],
    origin: [0.5, 0.5],
    align: [0.5, 0.5]
  });

  var _sm2 = new StateModifier({
    size: [500, 500],
    origin: [0.5, 0.5],
    align: [0.5, 0.5]
  });
  var rn2 = new RenderNode();
  rn2.add(_sm2).add(newSurface);


  newSurface._renderNode = rn2;


  newSurface._sm = _sm
  renderNode.add(_sm).add(newSurface);

  newSurface.on('click', function () {
    var outTransitionObj = {curve: Easing.outElastic, duration: 1000 }
    rc.show(rn2, outTransitionObj);
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
     scrollView.push(createSurface(model));
    });
  },
  error:   function (err) {
    console.log(err);
  }
});
mainContext.add(navbarSurface)

var stateModifier2 = new StateModifier({
  transform: Transform.translate(325, 50, 0)
});

var stateModifier3 = new StateModifier({
  transform: Transform.translate(325, 50, 0)
});


mainContext.add(stateModifier2).add(scrollView);

var cmod = new StateModifier({
  inTransition: true,
  outTransition: false,
  overlap: true
});
mainContext.add(cmod).add(rc);


