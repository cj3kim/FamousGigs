var FlexColumns = require('flex-columns');
var FlexibleLayout = require('famous/views/FlexibleLayout');
var ProfileBasics = require('./dashboard/profile_basics');
var Stats = require('./dashboard/stats');
var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');

var HeaderTitle = require('./dashboard/header_title');
var ContainerSurface = require('famous/surfaces/ContainerSurface');
var Avatar = require('./avatar');

var dashboardView = new FlexColumns({
  marginTop: 30,
  gutterCol: 20
});

var pb = new ProfileBasics();
var stats = new Stats();

dashboardView.createCol(450).addSurfaceToCol(0,pb);
dashboardView.createCol(200).addSurfaceToCol(1,stats);

var hfl = new HeaderFooterLayout({
  headerSize: 131
});

var fl1 = new FlexibleLayout({
  direction: 0,
  ratios: [0.8237, 0.1763]
});

var fl2 = new FlexibleLayout({
  direction: 1,
  ratios: [0.7633, 0.2367]
});

var headerTitle = new HeaderTitle();
var avatar = new Avatar();

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


