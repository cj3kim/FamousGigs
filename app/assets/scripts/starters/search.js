var CompanyAdCollection = require('../collections/company_ads');
var companyAds = new CompanyAdCollection;
var CompanyAdComponent = require('../react_views/components/company_ad');
var SearchFlexGrid = require('../views/SearchFlexGrid');
var React = require('react');
var ReactSurface = require('react-surface');
var page = require('page');
var localizedScroll = require('../views/ScrollTech');

module.exports = function (navbar) {
  var searchFlexGrid = new SearchFlexGrid();
  var container = localizedScroll(searchFlexGrid)

  var searchInput = navbar._searchInput;
  searchInput.pipe(searchFlexGrid._eventInput);

  var promise = companyAds.fetch();
  promise.done(function (models) {
    function genAd(model) {
      model.frontPage = true;
      var adSurface = new ReactSurface({
        classes: ['company-ad'],
        properties: {
          overflow: 'hidden'
        },
        content: <CompanyAdComponent {...model} />
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
  });

  return [searchInput, searchFlexGrid, container, companyAds];
}
