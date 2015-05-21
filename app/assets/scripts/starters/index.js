var Engine           = require('famous/core/Engine');
var GenSidebar         = require('../views/sidebar-menu/container');
var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
var StateModifier      = require('famous/modifiers/StateModifier');
var Transform        = require('famous/core/Transform');
var Modifier         = require('famous/core/Modifier');
var RenderController = require('famous/views/RenderController');
var FlexibleLayout   = require('famous/views/FlexibleLayout');
var Easing           = require('famous/transitions/Easing');
var NotificationBox  = require('../views/notification/index');
var LightBox         = require('famous/views/LightBox');

module.exports = function (mainContext) {
  var navbar = require('../views/MainNavbar');
  var headerFooterLayout = new HeaderFooterLayout({headerSize: 57});
  var navbarMod = new StateModifier({transform: Transform.translate(0,0,1) });
  headerFooterLayout.header.add(navbarMod).add(navbar);

  var bodyRC = new RenderController({
    overlap: true
  });

  //var lb = new LightBox({
    //inTransform:   Transform.translate(-500,0,0),
    //outTransform:  Transform.translate(500,0,0),
    //inTransition:  {duration: 500, curve: Easing.inSine },
    //outTransition: {duration: 500, curve: Easing.outSine },
    //inAlign:   [0,0],
    //outAlign:  [0,0],
    //showAlign: [0,0],
    //showOrigin:[0,0]
  //});


  headerFooterLayout.content.add(bodyRC);
  var notificationBox = NotificationBox();
  headerFooterLayout.content.add(notificationBox);

  var KaollaSu = require('../lib/KaollaSu')(mainContext);
  var _computeContextWidth = KaollaSu.computeContextWidth;
  var _resizeComputation   = KaollaSu.resizeComputation;

  var containerShell = new FlexibleLayout({
    direction: 0,
    transition: {duration: 200, curve: Easing.inOutSine },
    ratios: _resizeComputation()
  });
  var contextWidth = _computeContextWidth();
  var menuMod = new StateModifier({
    transform: Transform.translate(-contextWidth,0,0),
  });

  var mainMod = new StateModifier({
    transform: Transform.translate(0,0,0)
  });

  var sidebar1 = GenSidebar();
  var sidebar2 = GenSidebar();

  containerShell.sequenceFrom([sidebar1, headerFooterLayout]);

  mainContext.add(menuMod).add(sidebar2);
  mainContext.add(mainMod).add(containerShell);

  Engine.on('resize', function () {
    var contextWidth = _computeContextWidth();
    menuMod.setTransform(Transform.translate(-contextWidth,0,0));
    mainMod.setTransform(Transform.translate(0,0,0));
    containerShell.setRatios(_resizeComputation());
  });

  return {
    mobileMenu: {
      node: sidebar2,
      mod: menuMod
    },
    containerShell: {
      node: containerShell,
      mod: mainMod
    },
    headerFooterLayout: {
      node: headerFooterLayout
    },
    bodyRC: bodyRC,
    navbar: navbar
  }
}
