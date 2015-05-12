var View  = require('famous/core/View');
var Modifier = require('famous/core/Modifier');
var React = require('react');
var ReactSurface = require('react-surface');
var Transform = require('famous/core/Transform');

var DevHeaderComponent = React.createClass({
  render: function () {
    return (
      <div className='dev-header stop-gap-div'>
        <img  className='profile-picture' src="/public/images/cats.jpg" alt="cats" />
        <div className='company-name'>
          <span>WunderCode</span>
        </div>
        <ul className='company-info'>
          <li> San Francisco, CA </li>
        </ul>
        <div className='brief-description'>
          <span>Rapid Application Development Service</span>
        </div>
      </div>
    );
  }
});

function DevHeader(height)  {
  View.apply(this, arguments);

  var surface = new ReactSurface({
    size: [undefined, height],
    content: <DevHeaderComponent />,
    properties: {
      backgroundColor: 'white'
    }
  });

  this._node.add(surface);
}

DevHeader.prototype = Object.create(View.prototype);
DevHeader.prototype.constructor = DevHeader;

module.exports = DevHeader;


