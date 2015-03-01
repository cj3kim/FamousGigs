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

var CollectionLayout = require('famous-flex/src/layouts/CollectionLayout');
console.log(CollectionLayout);

var grid = new GridLayout({
  dimensions: [8, 8]
});

var surfaces = [];
var showing;

grid.sequenceFrom(surfaces);

var cmod = new StateModifier({
  inTransition: true,
  outTransition: false,
  overlap: true
});

var controller = new LightBox({
  inTransition: true,
  outTransition: false,
  overlap: true
});
controller.hide();

function newSurface(id) {
  console.log(CollectionLayout);
  var surface = new Surface({
    size: [undefined, undefined],
    content: id + 1,
    properties: {
      backgroundColor: "hsl(" + (id * 70 / 64) + ", 60%, 70%)",
      lineHeight: '50px',
      textAlign: 'center',
      cursor: 'pointer'
    }
  });

  surface._stateMod = new StateModifier({
    size: [500, 420],
    origin: [0.5, 0.5],
    align: [0.5, 0.5]
  });
  surface._renderNode = new RenderNode();
  surface._renderNode.add(surface._stateMod).add(surface);

  surfaces.push(surface);

  surface.on('click', function (context, e) {
    var inTransitionObj  = {curve: Easing.inElastic,  duration: 1000 }
    var outTransitionObj = {curve: Easing.outElastic, duration: 1000 }

    var hideFn = function () { gridModifier.setTransform(Transform.scale(1,1,1), outTransitionObj); };

    if (this === showing) {
      controller.hide(inTransitionObj, hideFn );
      showing = null;
    } else {
      showing = this;
      gridModifier.setTransform(Transform.scale(0.001, 0.001, 0.001), outTransitionObj)
      cmod.setTransform(Transform.translate(0,0, 0.0001));
      controller.show(this._renderNode, outTransitionObj);
    }  
  }.bind(surface, mainContext));
}

for (var i = 0; i < 64; i += 1) {
  newSurface(i);
}

var gridModifier = new StateModifier({
  size: [400, 400], 
  align: [0.5, 0.5],
  origin: [0.5, 0.5]
});

mainContext.add(gridModifier).add(grid);
mainContext.add(cmod).add(controller);
mainContext.add(navbarMod).add(navbarSurface);

//var stateModifier = new StateModifier({
  //transform: Transform.translate(300, 0, 0)
//});

//var stateModifierTwo = new StateModifier({
  //transform: Transform.translate(500, 0, 0)
//});

//var dashboard = new Surface({
  //size: [undefined, undefined],
  //properties: {
    //backgroundColor: 'brown'
  //}
//});

//var CompanyAdCollection = require('./collections/company_ads');

//var companyAds = new CompanyAdCollection();

//companyAds.fetch({
  //success: function (models) {
    //models.each(function(model) {
      //var newSurface = new Surface({
        //size: [200, 200],
        //content: model.get('title'),
        //properties: {
          //backgroundColor: 'yellow'
        //}
      //});
      //mainContext.add(stateModifierTwo).add(newSurface);
    //});
  //}, 
  //error:   function (err) {
    //console.log(err);
  //}
//});

//mainContext.add(stateModifier).add(dashboard);



