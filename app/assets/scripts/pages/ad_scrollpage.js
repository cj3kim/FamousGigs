var CompanyAdCollection = require('../collections/company_ads');
var companyAds = new CompanyAdCollection();
var React = require('react');
var ReactSurface = require('react-surface');

var StateModifier = require('famous/modifiers/StateModifier');
var RenderNode = require('famous/core/RenderNode');
var RenderController = require('famous/views/RenderController');

var Engine = require('famous/core/Engine');

var Scrollview = require('famous/views/Scrollview');
var ContainerSurface = require('famous/surfaces/ContainerSurface');
var FlexGrid = require('../views/FlexGrid');
var CompanyAd = require('../views/company_ad');
var page = require('page');

module.exports = function (models) {
  var scrollview = new Scrollview();

  Engine.pipe(scrollview);

  var flexGrid = new FlexGrid({
      marginTop: 20,
      marginSide: 20 ,
      gutterCol: 40,
      gutterRow: 20,
      itemSize: [262, 300]
  });
  var surfaces = [];

  scrollview.sequenceFrom([flexGrid]);
  flexGrid.sequenceFrom(surfaces);

  for (var i = 0; i < models.length; i += 1) {
    var model = models[i]
    var adSurface = new ReactSurface({
      classes: ['company-ad'],
      content: <CompanyAd {...model.attributes} />
    });
    var sm = new StateModifier({
      size: [262, 300],
    });

    adSurface.on('click', function () {
      page.show('/ad-details/'+ model.id);
    });

    var rn = new RenderNode();
    var rc = new RenderController();
    rn.add(sm).add(rc);
    rc.show(adSurface);

    surfaces.push(rn);
    flexGrid.resizeFlow();
  }


  return scrollview;
};
