var Transform        = require('famous/core/Transform');
module.exports = function (page, mainContext, obj, sfgScrollView) {
  var KaollaSu = require('../lib/KaollaSu')(mainContext);
  var _computeContextWidth = KaollaSu.computeContextWidth;
  var _resizeComputation   = KaollaSu.resizeComputation;


  var sidebar2 = obj.mobileMenu.node;
  var menuMod  = obj.mobileMenu.mod;
  var mainMod  = obj.containerShell.mod;
  var bodyRC   = obj.bodyRC;

  page('/gigs', function () {
    var transition = { duration: 500};

    var contextWidth = _computeContextWidth()
    menuMod.setTransform(Transform.translate(-contextWidth,0,0), transition);
    mainMod.setTransform(Transform.translate(0,0,0), transition);

    bodyRC.show(sfgScrollView, transition);
  });

  page('/mobile-menu', function () {
    var lb = sidebar2._lb;
    var backButton = lb._backButton;
    lb.show(backButton);

    var transition = {duration: 500};
    var contextWidth = _computeContextWidth()
    menuMod.setTransform(Transform.translate(0,0,0), transition);
    mainMod.setTransform(Transform.translate(contextWidth, 0 ,0), transition);
  });
};

