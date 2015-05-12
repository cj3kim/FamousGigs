var View  = require('famous/core/View');
var Modifier = require('famous/core/Modifier');
var React = require('react');
var ReactSurface = require('react-surface');
var Transform = require('famous/core/Transform');
var $ = require('zepto-browserify').$;
var page = require('page');



var LiComponent = React.createClass({
  componentDidMount: function () {
    var li  = React.findDOMNode(this);
    var $li = $(li);
    var _this = this;
    $li.on('click', function () {
      page.show(_this.props.route);
    })
  },

  render: function () {
    return (
      <li><span>{this.props.name }</span></li>
    );
  }

});


var CustomNavbarComponent = React.createClass({
  render: function () {

    return (
      <ul className='custom-navbar stop-gap-div'>
        <LiComponent {...this.props.portfolio }/>
        <LiComponent { ...this.props.profile }/>
        <li></li>
      </ul>
    );
  }
});

var portfolio = {
  route: '/dashboard/portfolio',
  name: 'Portfolio'
};
var profile = {
  route: '/dashboard/profile',
  name: 'Profile'
};

function CustomNavbar () {
  View.apply(this, arguments);

  var surface = new ReactSurface({
    size: [undefined, 50],
    content: <CustomNavbarComponent profile={ profile } portfolio={portfolio} />,
    properties: {
      backgroundColor: 'white',
      borderTop: 'solid 1px #7a7a7a',
      borderBottom: 'solid 1px #7a7a7a'
    }
  });

  this._node.add(surface);
}

CustomNavbar.prototype = Object.create(View.prototype);
CustomNavbar.prototype.constructor = CustomNavbar;

module.exports = CustomNavbar;
