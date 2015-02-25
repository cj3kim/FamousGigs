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
  transform: Transform.translate(300, 0, 0)
});

var stateModifierTwo = new StateModifier({
  transform: Transform.translate(500, 0, 0)
});

var dashboard = new Surface({
  size: [undefined, undefined],
  properties: {
    backgroundColor: 'brown'
  }
});

var CompanyAdCollection = require('./collections/company_ads');

var companyAds = new CompanyAdCollection();

companyAds.fetch({
  success: function (models) {
    models.each(function(model) {
      var newSurface = new Surface({
        size: [200, 200],
        content: model.get('title'),
        properties: {
          backgroundColor: 'yellow'
        }
      });
      mainContext.add(stateModifierTwo).add(newSurface);
    });
  }, 
  error:   function (err) {
    console.log(err);
  }
});




mainContext.add(stateModifier).add(dashboard);
mainContext.add(navbarMod).add(navbarSurface);



