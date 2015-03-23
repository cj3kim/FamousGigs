
var View          = require('famous/core/View');
var StateModifier = require('famous/modifiers/StateModifier');
var Transform        = require('famous/core/Transform');


var Surface       = require('famous/core/Surface');
var ImageSurface  = require('famous/surfaces/ImageSurface');
var Transform     = require('famous/core/Transform');
var ContainerSurface = require('famous/surfaces/ContainerSurface');


function ApplyNow () {
  View.apply(this, arguments);

  var apply = new ContainerSurface({
    size: [265, 284],
    properties: {
      backgroundColor: 'white'
    }
  });

  var baseStateMod = new StateModifier({transform: Transform.translate(15, 0, 0) });

  var applyBtnStateMod   = new StateModifier({ transform: Transform.translate(0, 15, 0) });
  var detailStateMod  = new StateModifier({ transform: Transform.translate(0, 75, 0) });
  var contactStateMod = new StateModifier({ transform: Transform.translate(0, 195, 0) });


  var applyBtn = new Surface({
    size: [233, 50],
    content: 'Apply Now',
    properties: {
      borderRadius: '2.5%',
      fontFamily: 'Raleway, serif',
      textAlign: 'center',
      backgroundColor: '#3b9eb7',
      color: 'white'
    }
  });

  var details = new Surface({
    size: [233, 109],
    properties: {
      backgroundColor: 'red',
    },
    content: ""
  });

  var contact = new Surface({
    size: [233, 80],
    properties: {
      backgroundColor: 'green',
    },
    content: ""
  });


  var node = apply.add(baseStateMod);
  node.add(applyBtnStateMod).add(applyBtn);

  node.add(detailStateMod).add(details);
  node.add(contactStateMod).add(contact);

  this._node.add(node);

}

ApplyNow.prototype = Object.create(View.prototype);
ApplyNow.prototype.constructor = View;

module.exports = ApplyNow;
