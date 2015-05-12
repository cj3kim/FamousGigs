var FlexColumns    = require('../flex-columns/index');
var Transform = require('famous/core/Transform')
var Modifier  = require('famous/core/Modifier');

var FlexibleLayout = require('famous/views/FlexibleLayout');

var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
var ContainerSurface   = require('famous/surfaces/ContainerSurface');

var ProfileBasics = require('./profile_basics');
var WorkUpload = require('../work-upload/index');
var Header = require('./header');

var hfl = new HeaderFooterLayout({
  headerSize: 200 
});



var dashboardView = new FlexColumns({
  marginTop: 20,
  gutterCol: 20,
  gutterRow: 20
});

var profileBasics = new ProfileBasics();
var workUpload = new WorkUpload();

dashboardView.createCol(450).addColNode(0, profileBasics, 450);
dashboardView.createCol(235).addColNode(1, workUpload, 235);

var CustomNavbar = require('./custom_navbar');

var modCustomNavbar = new Modifier({
  transform: Transform.translate(0,150, 0)
});

hfl.header.add(Header);
hfl.header.add(modCustomNavbar).add(new CustomNavbar());
hfl.content.add(dashboardView);

module.exports = hfl;


