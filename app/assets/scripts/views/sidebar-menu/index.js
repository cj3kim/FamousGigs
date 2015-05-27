
var Surface = require('famous/core/Surface');
var Modifier = require('famous/core/Modifier');
var View = require('famous/core/View');
var Easing = require('famous/transitions/Easing');
var LightBox = require('famous/views/Lightbox');

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
    //ratios: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
    ratios: [undefined, undefined, undefined, undefined, undefined]
  });

  var menuHeader = new Surface({
    size: [undefined, 56],
    content: "<div class='sidebar-header stop-gap-div'><span class='first'>famous<span class='second'>gigs</span></span></div>",
    properties: {
      backgroundColor: "#40adc2",
      color: "white"
    }
  });

  var works = new Surface({
    size: [undefined, 56],
    classes: ['sidebar-menu', 'stop-gap-div'],
    content: "<span class='menu-item'><span class='icon flaticon-building104'></span><span class='copy'>Works</span> </span>",
    properties: {
      color: "white"
    }
  });

  var gigs = new Surface({
    size: [undefined, 60],
    classes: ['sidebar-menu', 'stop-gap-div'],
    content: "<span class='menu-item'><span class='icon flaticon-pin71'></span><span class='copy'>Gigs/Jobs</span> </span>",
  });

  var posts = new Surface({
    size: [undefined, 60],
    classes: ['sidebar-menu', 'stop-gap-div'],
    content: "<span class='menu-item'><span class='icon flaticon-sheet3'></span><span class='copy'>Post</span> </span>",
  });

  var developers = new Surface({
    size: [undefined, 60],
    classes: ['sidebar-menu', 'stop-gap-div'],
    content: "<span class='menu-item'><span class='icon flaticon-user91'></span><span class='copy'>Developers</span></span>",
  });

  //var dashboard = new Surface({
    //size: [undefined, 60],
    //classes: ['sidebar-menu', 'stop-gap-div'],
    //content: "<span class='menu-item'><span class='icon flaticon-edit45'></span><span class='copy'>Dashboard</span> </span>",
  //});

  //var register = new Surface({
    //size: [undefined, 60],
    //classes: ['sidebar-menu', 'stop-gap-div'],
    //content: "<span class='menu-item'><span class='icon flaticon-login2'></span><span class='copy'>Register</span> </span>",
  //});

  //var login = new Surface({
    //size: [undefined, 60],
    //classes: ['sidebar-menu', 'stop-gap-div'],
    //content: "<span class='menu-item'><span class='icon flaticon-login2'></span><span class='copy'>Login</span></span>",
  //});

  works.on('click', function () {
    page.show('/');
  });

  gigs.on('click', function () {
    page.show('/gigs');
  });

  posts.on('click', function () {
    page.show('/company_ads/payment');
  });

  developers.on('click', function () {
    page.show('/developers');
  });

  //dashboard.on('click', function () {
    //page.show('/dashboard');
  //});

  //register.on('click', function () {
    //page.show('/registration');
  //});

  //login.on('click', function () {
    //page.show('/login')
  //});

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

  //make sure to update the ratios array if you add a view here
  //flexibleLayout.sequenceFrom([menuHeader, works, gigs, developers, posts, dashboard, register, login]);
  flexibleLayout.sequenceFrom([menuHeader, works, gigs, developers, posts]);

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
