
var View          = require('famous/core/View');
var StateModifier = require('famous/modifiers/StateModifier');
var Transform        = require('famous/core/Transform');


var Surface       = require('famous/core/Surface');
var ImageSurface  = require('famous/surfaces/ImageSurface');
var Transform     = require('famous/core/Transform');
var ContainerSurface = require('famous/surfaces/ContainerSurface');

var React = require('react');
var ReactSurface = require('../react_surface');

var AdInformation = React.createClass({
  render: function () {
    return (
      <div className='ad-information stop-gap-div'>
        <div className='details'> 
          <span>DETAILS</span>
          <ul>
            <li><span className='flaticon-building104 icon'></span> Company </li>
            <li><span className='flaticon-pin71 icon'></span> Oakland, CA</li>
            <li><span className='flaticon-wifi11 icon'></span> Remote Working Ok</li>
          </ul>
        </div>

        <div className='contact'> 
          <span>CONTACT</span>
          <ul>
            <li> <span className='flaticon-user91 icon'></span> Chris Kim </li>
            <li>  <span className='flaticon-mail59 icon'></span> chris@wundercode.net </li>
          </ul>
        </div>
      </div>
    );
  }
});

function ApplyNow () {
  View.apply(this, arguments);

  var apply = new ContainerSurface({
    size: [265, 290],
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
    content: 'APPLY',
    classes: ['apply-now-btn'],
    properties: {
      borderRadius: '2.5%',
      fontFamily: 'Raleway, serif',
      textAlign: 'center',
      backgroundColor: '#3b9eb7',
      color: 'white'
    }
  });

  var details = new ReactSurface({
    size: [233, 200],
    content: <AdInformation />
  });

  var node = apply.add(baseStateMod);
  node.add(applyBtnStateMod).add(applyBtn);

  node.add(detailStateMod).add(details);

  this._node.add(node);

}

ApplyNow.prototype = Object.create(View.prototype);
ApplyNow.prototype.constructor = View;

module.exports = ApplyNow;
