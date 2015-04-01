var CompanyAdCollection = require('../collections/company_ads');
var companyAds = new CompanyAdCollection();

var Engine = require('famous/core/Engine');

var Scrollview = require('famous/views/Scrollview');
var ContainerSurface = require('famous/surfaces/ContainerSurface');
var FlexGrid = require('../views/FlexGrid');

module.exports = function (bodyRC, adDetails) {
  var generateAdSurface = require('../generators/generate_ads')(bodyRC, adDetails);
  var scrollview = new Scrollview();

  Engine.pipe(scrollview);

  var flexGrid = new FlexGrid({
      marginTop: 20,
      marginSide: 20 ,
      gutterCol: 40,
      gutterRow: 20,
      itemSize: [262, 300]
  });

  scrollview.sequenceFrom([flexGrid]);
  var surfaces = [];

  companyAds.fetch({
    success: function (models) {
      models.each(function(model) {
        var rn = generateAdSurface(model);
        surfaces.push(rn);
        flexGrid.resizeFlow();
      });
  },
    error:   function (err) {
      console.log(err);
    }
  });

  flexGrid.sequenceFrom(surfaces);

  return scrollview;
};
