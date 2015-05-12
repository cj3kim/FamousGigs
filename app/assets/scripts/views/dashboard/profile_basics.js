
var React = require('react');

var ReactSurface = require('react-surface');
var View = require('famous/core/View');
var ProfileBasicsReact = require('../../react_views/dashboard/profile_basics');

var User = require('../../models/singleton/user');

function ProfileBasics() {
  View.apply(this, arguments);

  var pbr = <ProfileBasicsReact />
  console.log(pbr);

  this.surface = new ReactSurface({
    size: [450, 315],
    classes: ['rounded-corners'],
    content: pbr
  });

  this._node.add(this.surface);
}

ProfileBasics.prototype = Object.create(View.prototype);
ProfileBasics.prototype.constructor = View;

module.exports = ProfileBasics;


