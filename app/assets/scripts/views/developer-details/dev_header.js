var View  = require('famous/core/View');
var Modifier = require('famous/core/Modifier');
var React = require('react');
var ReactSurface = require('react-surface');
var Transform = require('famous/core/Transform');

var DevHeaderComponent = React.createClass({
  render: function () {
    return (
      <div className='dev-header stop-gap-div'>
        <img  className='profile-picture' src={this.props.avatar_url} />
        <div className='company-name'>
          <span>{ this.props.email || this.props.full_name }</span>
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
    properties: {
      backgroundColor: 'white'
    }
  });

  this._node.add(surface);
  this.update = function (model) {
    surface.setContent(<DevHeaderComponent {...model.attributes }/>);
  };
}

DevHeader.prototype = Object.create(View.prototype);
DevHeader.prototype.constructor = DevHeader;

module.exports = DevHeader;


