// Load polyfills
require('famous-polyfills');

// import dependencies
var Engine           = require('famous/core/Engine');
var Easing           = require('famous/transitions/Easing');

var RenderNode       = require('famous/core/RenderNode');
var RenderController = require('famous/views/RenderController');
var Entity           = require('famous/core/Entity');
var Surface          = require('famous/core/Surface');
var Modifier         = require('famous/core/Modifier');
var Transform        = require('famous/core/Transform');
var FlexibleLayout   = require('famous/views/FlexibleLayout');
var ContainerSurface = require('famous/surfaces/ContainerSurface');
var StateModifier    = require('famous/modifiers/StateModifier');

var CompanyAd = require('./views/company_ad');
var React = require('react');
var ReactSurface = require('react-surface');

var GenSidebar       = require('./views/sidebar-menu/container');
var page = require('page');

var mainContext = Engine.createContext();
mainContext.setPerspective(1000);

var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
var headerFooterLayout = new HeaderFooterLayout({headerSize: 55});

function _computeContextWidth() {
  var size = mainContext.getSize();
  var width = size[0];

  return width;
}
function _resizeComputation() {
  var width = _computeContextWidth();
  return width > 700 ? [0.185, 0.815] : [0,1] ;
}

var flexibleLayout = new FlexibleLayout({
  direction: 0,
  transition: {duration: 200, curve: Easing.inOutSine },
  ratios: _resizeComputation()
});

var menuMod = new StateModifier({
  transform: Transform.translate(-(_computeContextWidth()),0,0),
});
var mainMod = new StateModifier({
  transform: Transform.translate(0,0,0)
});

var sidebar1 = GenSidebar();
var sidebar2 = GenSidebar();

flexibleLayout.sequenceFrom([sidebar1, headerFooterLayout]);
mainContext.add(menuMod).add(sidebar2);
mainContext.add(mainMod).add(flexibleLayout);

Engine.on('resize', function () {
  var contextWidth = (_computeContextWidth());
  menuMod.setTransform(Transform.translate(-contextWidth,0,0));

  flexibleLayout.setRatios(_resizeComputation());
});


// Create scrollable layout where items have a fixed width/height
var AdDetails = require('./views/ad_details');
var adDetails = new AdDetails({gutterCol: 50, gutterRow: 30 });

// create the main context
var bodyRC = new RenderController({overlap: false});
var mod = new Modifier({transform: Transform.translate(0, 30, 0)});
var navbar = require('./views/nav_bar');


headerFooterLayout.header.add(navbar);
headerFooterLayout.content.add(mod).add(bodyRC);

var CompanyAdCollection = require('./collections/company_ads');
var companyAds = new CompanyAdCollection;

//var searchInput = navbar._searchInput;
//var adScrollPage = require('./pages/ad_scrollpage');

var SearchFlexGrid = require('./views/SearchFlexGrid');
var searchFlexGrid = new SearchFlexGrid();

//searchInput.pipe(searchFlexGrid._eventInput);

page('/', function () {
  var transition = { duration: 500, curve: Easing.inQuad };
  bodyRC.show(searchFlexGrid, transition);

  var lb = sidebar2._lb;
  var backButton = lb._backButton;
  var contextWidth = _computeContextWidth()

  menuMod.setTransform(Transform.translate(-contextWidth,0,0), transition);
  mainMod.setTransform(Transform.translate(0,0,0), transition);

  flexibleLayout.setRatios(_resizeComputation());
});

page('/mobile-menu', function () {
  var transition = { duration: 500, curve: Easing.inQuad };
  var lb = sidebar2._lb;
  var backButton = lb._backButton;
  var contextWidth = _computeContextWidth()

  menuMod.setTransform(Transform.translate(0,0,0), transition);
  mainMod.setTransform(Transform.translate(contextWidth, 0 ,0), transition);
  lb.show(backButton);
});

companyAds.fetch({
  success: function (collection) {
    var models = collection.models;
    function genAd(model) {
      var adSurface = new ReactSurface({
        classes: ['company-ad'],
        content: <CompanyAd {...model.attributes} />
      });

      adSurface.on('click', function () {
        page.show('/ad-details/'+ model.id);
      });
      return adSurface;
    }

    for (var i = 0; i < models.length; i += 1) {
      var model = models[i];
      var adSurface = genAd(model);
      searchFlexGrid.addNode(model, adSurface);
    }
  },
  error: function (models) {}
});

var carousel = require('./views/postify')();

page('/company_ads/payment', function () {
  bodyRC.show(carousel, {duration: 1000}, function () {
    carousel.showFirst();
  });
});

var Scrollview = require('famous/views/Scrollview');
var ad_detail_scrollview = new Scrollview();
ad_detail_scrollview.sequenceFrom([adDetails]);
Engine.pipe(ad_detail_scrollview);

page('/ad-details/:id', function (ctx) {
  var id = ctx.params.id;
  var ad = companyAds.get(id);
  adDetails.trigger('reset-ad-details', ad);

  var transition = {duration: 200, curve: Easing.inSine };
  bodyRC.show(ad_detail_scrollview, transition);
});

page.show('/');


