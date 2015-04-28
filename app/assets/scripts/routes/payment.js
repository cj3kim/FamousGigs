module.exports = function (page, obj ) {
  var bodyRC = obj.bodyRC;
  var carousel = require('../views/postify')();

  page('/company_ads/payment', function () {
    var transition = { duration: 500, curve: Easing.inQuad };
    bodyRC.show(carousel, transition,  function () {
      carousel.showFirst();
    });
  });
};

