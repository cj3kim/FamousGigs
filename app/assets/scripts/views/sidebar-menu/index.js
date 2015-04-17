
var Surface = require('famous/core/Surface');
var Modifier = require('famous/core/Modifier');
var View = require('famous/core/View');
var page = require('page');

var FlexibleLayout = require('famous/views/FlexibleLayout');

function SidebarMenu() {
  View.apply(this, arguments);

  
  var flexibleLayout = new FlexibleLayout({
    direction: 1, 
    ratios: [undefined, undefined, undefined]
  });

  var menuHeader = new Surface({
    size: [undefined, 56],
    content: "<div class='sidebar-header stop-gap-div'><span class='first'>famous<span class='second'>gigs</span></span></div>",
    properties: {
      backgroundColor: "#40adc2",
      color: "white"
    }
  });


  var posts = new Surface({
    size: [undefined, 60],
    classes: ['sidebar-menu', 'stop-gap-div'],
    content: "<span class='menu-item'><span class='icon flaticon-sheet3'></span><span class='copy'>Post</span> </span>",
  });

  var gigs = new Surface({
    size: [undefined, 60],
    classes: ['sidebar-menu', 'stop-gap-div'],
    content: "<span class='menu-item'><span class='icon flaticon-edit45'></span><span class='copy'>Gigs/Jobs</span> </span>",
  });

  gigs.on('click', function () {
    page.show('/');
  });

  flexibleLayout.sequenceFrom([menuHeader, gigs, posts]);

  this._node.add(flexibleLayout);
}

SidebarMenu.prototype = Object.create(View.prototype);
SidebarMenu.prototype.constructor = SidebarMenu;

module.exports = SidebarMenu;
