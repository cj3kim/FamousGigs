var CompanyAdCollection = require('../collections/company_ads');
var companyAds = new CompanyAdCollection();


var ContainerSurface = require('famous/surfaces/ContainerSurface');
var CollectionLayout = require('../../../../famous-flex/src/layouts/CollectionLayout');
var FlexScrollView   = require('../../../../famous-flex/src/FlexScrollView');

module.exports = function (bodyRC, adDetails) {

  var generateAdSurface = require('../generators/generate_ads')(bodyRC, adDetails);
  var scrollView = new FlexScrollView({
    layout: CollectionLayout,
    layoutOptions: {
      itemSize: [262, 300],    // item has width and height of 100 pixels
      margins: [10, 10, 10, 10], // outer margins
      spacing: [15, 20],        // spacing between items
      //screenSizeOffset: [0,20], // hacked famous-flex to achieve this
    },
    flow: true
  });

  var container = new ContainerSurface({});

  container.add(scrollView);
  container.pipe(scrollView);

  container.companyAds = companyAds;
  container.generateAdSurface = generateAdSurface;
  container.scrollView = scrollView;

  return container;
};
