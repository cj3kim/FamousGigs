var Engine           = require('famous/core/Engine');
var CompanyAdCollection = require('../collections/company_ads');
var companyAds = new CompanyAdCollection;
var CompanyAd = require('../views/company_ad');

var ScrollView = require('famous/views/ScrollView');
var SearchFlexGrid = require('../views/SearchFlexGrid');

var React = require('react');
var ReactSurface = require('react-surface');
var page = require('page');

module.exports = function (navbar) {
  var searchFlexGrid = new SearchFlexGrid();
  var sfgScrollView = new ScrollView();

  sfgScrollView.sequenceFrom([searchFlexGrid]);
  Engine.pipe(sfgScrollView);

  var searchInput = navbar._searchInput;
  searchInput.pipe(searchFlexGrid._eventInput);

  var promise = companyAds.fetch();
  promise.done(function (models) {
    function genAd(model) {
      var adSurface = new ReactSurface({
        classes: ['company-ad'],
        content: <CompanyAd {...model} />
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



  return [searchInput, searchFlexGrid, sfgScrollView, companyAds];
}
