
var Surface = require('famous/core/surface');
var ContainerSurface = require('famous/surfaces/ContainerSurface');
var FlexNavbar = require('./FlexNavbar');
var page = require('page');

var flexNavbar = new FlexNavbar();

var containerSurface = new ContainerSurface({
  size: [undefined, 56],
  properties: {
    backgroundColor: '0d283f'
  }
});

var postSurface = new Surface({
  size: [61, 56],
  classes: ['flex-navbar', 'left'],
  content: "<span class='menu-item flaticon-sheet3'></span>",
});

postSurface.on('click', function () {
  page.show('/company_ads/payment');
});

var menuSurface = new Surface({
  size: [61, 56],
  classes: ['flex-navbar', 'right'],
  content: "<span class='menu-item flaticon-menu55'></span>",
});

menuSurface.on('click', function () {
  console.log('show this page');
  page.show('/mobile-menu');
});

var loginSurface = new Surface({
  size: [61, 56],
  classes: ['flex-navbar', 'left'],
  content: "<span class='menu-item flaticon-login2'></span>",
});

var searchInput = require('./SearchInput');
//var leftSurfaces = [menuSurface, searchInput];
var leftSurfaces = [menuSurface];
var rightSurfaces = [loginSurface, postSurface];


var dock = {
  left: leftSurfaces,
  right: rightSurfaces
};

flexNavbar.linkDock(dock);
containerSurface.add(flexNavbar);
containerSurface._searchInput = searchInput;

module.exports = containerSurface;


