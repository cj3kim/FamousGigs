var Easing     = require('famous/transitions/Easing');
var RenderNode = require('famous/core/RenderNode');
var Modifier   = require('famous/core/Modifier');
var Transform  = require('famous/core/Transform');
var developers = require('../collections/singleton/developers');

var DevProfile = require('../views/developer-details/index');
var genDevFlexGrid = require('../starters/developer_ads');

var devFlexGrid = genDevFlexGrid();
var localizedScroll = require('../views/ScrollTech');


module.exports = function (page, obj) {
  var bodyRC = obj.bodyRC;

  var devsContainer = localizedScroll(devFlexGrid);
  page('/developers', function (ctx) {
    bodyRC.show(devsContainer, function () {
      devFlexGrid.loadDevs();
    });
  });

  var devProfile = new DevProfile();
  var container  = localizedScroll(devProfile);

  page('/developers/:id', function (ctx) {
    var id = ctx.params.id;
    var developer = developers.get(id);

    devProfile.update(developer);
    bodyRC.show(container);
  });
}
