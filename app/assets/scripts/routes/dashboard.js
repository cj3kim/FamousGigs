var dashboard = require('../views/dashboard/index');

module.exports = function (page, obj) {
  var bodyRC = obj.bodyRC;

  page('/dashboard', function () {
    bodyRC.show(dashboard);
  });
};
