
var View  = require('famous/core/View');
var Modifier = require('famous/core/Modifier');
var React = require('react');
var ReactSurface = require('react-surface');
var Transform = require('famous/core/Transform');

var DevAboutComponent = React.createClass({
  render: function () {
    return (
      <div className='dev-details stop-gap-div'>
        <div className='logo'>
          <img src='/public/images/cats.jpg' />
        </div>

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

function DevAbout () {
  View.apply(this, arguments);

  var mod = new Modifier({
    transform: Transform.translate(400, 100,0)
  });
  console.log('DevAboutComponent');
  console.log(devAbout);
  var devAbout =  <DevAboutComponent />;

  var surface = new ReactSurface({
    size: [200, true],
    classes: ['rounded-corners'],
    content: devAbout,
    properties: {
      backgroundColor: 'white'
    }
  });

  this._node.add(mod).add(surface);

  this.update = function (model) {

  };
}

DevAbout.prototype = Object.create(View.prototype);
DevAbout.prototype.constructor = DevAbout;

module.exports = DevAbout;
