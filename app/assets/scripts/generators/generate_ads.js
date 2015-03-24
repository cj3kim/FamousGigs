var React = require('react');

var ReactSurface = require('../react_surface');
var RenderNode   = require('famous/core/RenderNode');
var RenderController = require('famous/views/RenderController');
var StateModifier    = require('famous/modifiers/StateModifier');
var Easing           = require('famous/transitions/Easing');

var CompanyAd = require('../views/company_ad');
var surfaces = [];

module.exports = function (viewRenderController, adDetails) {
  return function generateAdSurface(model) {
    var adSurface = new ReactSurface({
      classes: ['company-ad'],
      content: <CompanyAd {...model.attributes} />
    });

    surfaces.push(adSurface);

    var renderNode = new RenderNode();
    var rc = new RenderController();

    var surfaceStateMod = new StateModifier({
      size: [262, 300],
    });

    adSurface._rc = rc;
    adSurface._sm = surfaceStateMod

    renderNode.add(surfaceStateMod).add(rc);
    rc.show(adSurface);

    adSurface.on('click', function () {
      adDetails._eventInput.emit('reset-ad-details', model);
      viewRenderController.show(adDetails);
    });

    return renderNode;
  }
}

