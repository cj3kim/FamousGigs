var Engine = require('famous/core/Engine');
var Easing     = require('famous/transitions/Easing');
var RenderNode = require('famous/core/RenderNode');
var Modifier   = require('famous/core/Modifier');
var Transform  = require('famous/core/Transform');
var ScrollView = require('famous/views/ScrollView');

var developerScrollView = require('../starters/developer_ads');
var DevProfile = require('../views/developer-details/index');
var developers = require('../collections/singleton/developers');

module.exports = function (page, obj) {
  var bodyRC = obj.bodyRC;

  page('/developers', function (ctx) {
    bodyRC.show(developerScrollView, function () {
      developerScrollView.loadDevs();
    });
  });

  var devProfile = new DevProfile();
  var scrollview = new ScrollView();
  scrollview.sequenceFrom([devProfile]);


  Engine.pipe(scrollview);

  page('/developers/:id', function (ctx) {
    var id = ctx.params.id;
    var developer = developers.get(id);

    devProfile.update(developer);
    bodyRC.show(scrollview);
  });
}
