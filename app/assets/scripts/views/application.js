
var View          = require('famous/core/View');
var StateModifier = require('famous/modifiers/StateModifier');

var Surface       = require('famous/core/Surface');
var ImageSurface  = require('famous/surfaces/ImageSurface');
var Transform     = require('famous/core/Transform');
var ContainerSurface = require('famous/surfaces/ContainerSurface');

var ApplyNow = require('./apply_now');

function Application () {
  View.apply(this, arguments);

  //We need to show the expanded ad and application view here

  var container = new ContainerSurface({
    //size: [265, 420],
    classes: ['rounded-corners']
  });

  var logo = new ImageSurface({
    size: [265, 136],

    properties: {
      backgroundColor: '#0d283e'
    }
  });
  logo.setContent('/public/images/cats.jpg');

  var applyNow = new ApplyNow();

  var sm = new StateModifier({
    size: [265, 284],
    transform: Transform.translate(0, 136,0)
  });

  container.add(logo);
  container.add(sm).add(applyNow);

  this._node.add(container);
}

Application.prototype = Object.create(View.prototype);
Application.prototype.constructor = View;

module.exports = Application;
