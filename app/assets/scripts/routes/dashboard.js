var dashboard = require('../views/dashboard/index');
var $ = require('zepto-browserify').$;
var Promise = require('bluebird');

module.exports = function (page, obj) {
  var bodyRC = obj.bodyRC;

  console.log($);
  //TODO do an api verificatio check
  page('/dashboard', function () {
    if (sessionStorage.user) {
      var user = JSON.parse(sessionStorage.user);

      var resolveVerification = Promise.resolve(
        $.ajax({
          type: 'GET',
          url: '/api/verify',
          headers: { 'Authorization' : "Bearer " + user.token }})
      );

      resolveVerification
        .then(function(data) {
          console.log('dashboard was successfully shown');
          bodyRC.show(dashboard);
        })
        .catch(function (xhr) {
          console.log('dashboard was not shown');
          console.log(arguments);
        });
    } else {
      throw new Error("You are not logged in");
    }
  });
};
