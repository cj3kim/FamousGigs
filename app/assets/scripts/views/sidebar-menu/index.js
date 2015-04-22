
var Surface = require('famous/core/Surface');
var Modifier = require('famous/core/Modifier');
var View = require('famous/core/View');
var Easing = require('famous/transitions/Easing');
var LightBox = require('famous/views/LightBox');

var Transform = require('famous/core/Transform');
var Modifier = require('famous/core/Modifier');
var StateModifier = require('famous/modifiers/StateModifier');
var RenderNode = require('famous/core/RenderNode');

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

  var backButton = new Surface({
    size: [40, 40],
    classes: ['circle-icon'],
    content: "<span> < </span>"
  });

  backButton.on('click', function () {
    page.show('/')
  });

  var lb = new LightBox({
    inTransform: Transform.translate(15,-100,0),
    outTransform: Transform.translate(15,-20,0),
    inTransition:  {duration: 500, curve: Easing.inOutBounce },
    outTransition: {duration: 300, curve: Easing.outSine },
    inAlign: [0,0],
    outAlign: [0,0],
    showAlign: [0,0],
    showOrigin:[0,0]
  });

  this._lb = lb;
  flexibleLayout.sequenceFrom([menuHeader, gigs, posts]);

  var mod = new Modifier({
    transform: Transform.translate(15,10,0)
  })
  var rn = new RenderNode();
  rn.add(mod).add(backButton);

  lb._backButton = rn;

  this._node.add(flexibleLayout);
  this._node.add(lb);
}

SidebarMenu.prototype = Object.create(View.prototype);
SidebarMenu.prototype.constructor = SidebarMenu;

module.exports = SidebarMenu;