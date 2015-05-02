var dashboard = require('../views/dashboard/index');

module.exports = function (page, obj) {
  var bodyRC = obj.bodyRC;

  //TODO do an api verificatio check
  page('/dashboard', function () {
    bodyRC.show(dashboard);
  });
};
