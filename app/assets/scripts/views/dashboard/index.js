var Transform = require('famous/core/Transform')
var Modifier  = require('famous/core/Modifier');
var Easing    = require('famous/transitions/Easing');


var LightBox         = require('famous/views/LightBox');
var FlexibleLayout = require('famous/views/FlexibleLayout');

var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
var ContainerSurface   = require('famous/surfaces/ContainerSurface');

var Header    = require('./header');
var Profile   = require('./profile/index');
var Portfolio = require('./portfolio/index');
var AddWork   = require('./add-work/index');

var page = require('page');

var dashboard = new HeaderFooterLayout({
  headerSize: 200 
});

dashboard.header.add(Header);
var CustomNavbar = require('./custom_navbar');
var modCustomNavbar = new Modifier({
  transform: Transform.translate(0,150, 0)
});

dashboard.header.add(modCustomNavbar).add(new CustomNavbar());

var lightbox = new LightBox({
  inTransform:   Transform.translate(-500,0,0),
  outTransform:  Transform.translate(500,0,0),
  inTransition:  {duration: 500, curve: Easing.inSine },
  outTransition: {duration: 500, curve: Easing.outSine },
  inAlign:   [0,0],
  outAlign:  [0,0],
  showAlign: [0,0],
  showOrigin:[0,0]
});

dashboard.content.add(lightbox);
lightbox.show(Portfolio);

page('/dashboard/profile', function () {
  lightbox.show(Profile);
});

page('/dashboard/portfolio', function () {
  lightbox.show(Portfolio);
});
page('/dashboard/portfolio/add', function () {
  lightbox.show(AddWork);
});

module.exports = dashboard;


