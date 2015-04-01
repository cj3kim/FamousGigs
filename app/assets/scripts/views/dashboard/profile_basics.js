
var React = require('react');

var ReactSurface = require('react-surface');
var View = require('famous/core/View');
var ProfileBasicsReact = require('../../react_views/dashboard/profile_basics');

function ProfileBasics() {
  View.apply(this, arguments);

  this.surface = new ReactSurface({
    size: [450, 310],
    content: <ProfileBasicsReact />
  });

  this._node.add(this.surface);
}

ProfileBasics.prototype = Object.create(View.prototype);
ProfileBasics.prototype.constructor = View;

module.exports = ProfileBasics;


