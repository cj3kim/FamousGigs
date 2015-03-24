var React = require('react');
var ReactSurface = require('../react_surface');


var NavbarView = require('../views/navbar');
var navbarSurface = new ReactSurface({
  size: [300, undefined],
  content: <NavbarView />,
  properties: {
    backgroundColor: '#0a3650'
  }
});

module.exports = navbarSurface;
