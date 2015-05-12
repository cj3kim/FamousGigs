var FlexColumns    = require('../flex-columns/index');
var FlexibleLayout = require('famous/views/FlexibleLayout');

var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
var ContainerSurface   = require('famous/surfaces/ContainerSurface');

var ProfileBasics = require('./profile_basics');
var HeaderTitle   = require('./header_title');
var Avatar        = require('./avatar');
var Stats         = require('./stats');

var dashboardView = new FlexColumns({
  gutterCol: 20,
  gutterRow: 20
});

var pb = new ProfileBasics();
var stats = new Stats();

dashboardView.createCol(450).addColNode(0,pb, 450);

var hfl = new HeaderFooterLayout({
  headerSize: 131
});

var fl1 = new FlexibleLayout({
  direction: 0,
  ratios: [0.8237, 0.1763]
});

var headerTitle = new HeaderTitle();
var avatar      = new Avatar();

var containerSurface = new ContainerSurface({
  size: [undefined, undefined],
  properties: {
    backgroundColor: 'white'
  }
});

fl1._nodes.push(headerTitle);
fl1._nodes.push(avatar);

containerSurface.add(fl1);

hfl.header.add(containerSurface);
hfl.content.add(dashboardView);

module.exports = hfl;


