var dashboard = require('../views/dashboard/index');
var $ = require('zepto-browserify').$;
var Promise = require('bluebird');
var user = require('../models/singleton/user');

module.exports = function (page, obj) {
  var bodyRC = obj.bodyRC;

  //TODO do an api verificatio check
  page('/dashboard', function () {
    user.verifySession()
      .then(function(data) {
        bodyRC.show(dashboard, function () {
          page.show('/dashboard/portfolio');
        });
      })
      .catch(function (xhr) {
        console.log(arguments);
      });
  });
};
