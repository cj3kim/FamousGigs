var Engine     = require('famous/core/Engine');
var Developers = require('../collections/singleton/developers');
var DeveloperAdComponent = require('../react_views/components/developer_ad');
var ScrollView = require('famous/views/ScrollView');
var SearchFlexGrid = require('../views/SearchFlexGrid');

var React = require('react');
var ReactSurface = require('react-surface');
var page = require('page');

var Promise = require('bluebird');

module.exports = function () {
  var searchFlexGrid = new SearchFlexGrid();
  var sfgScrollView = new ScrollView();

  sfgScrollView.sequenceFrom([searchFlexGrid]);
  Engine.pipe(sfgScrollView);

  var promise = Promise.resolve(Developers.fetch());
  promise
    .then(function (models) {
      function genAd(model) {
        var adSurface = new ReactSurface({
          classes: ['company-ad'],
          content: <DeveloperAdComponent {...model} />
        });

        adSurface.on('click', function () { });
        return adSurface;
      }

      for (var i = 0; i < models.length; i += 1) {
        var model = models[i];
        var adSurface = genAd(model);
        searchFlexGrid.addNode(model, adSurface);
      }
    })
    .catch(function(err) {
      console.log('developer ads error');
      console.log(err);
    });

  return sfgScrollView;
};
