var dashboard = require('../views/dashboard/index');
var $ = require('zepto-browserify').$;

module.exports = function (page, obj) {
  var bodyRC = obj.bodyRC;

  console.log($);
  //TODO do an api verificatio check
  page('/dashboard', function () {

    console.log('attempting to show the dashboard');
    console.log(sessionStorage.user);

    if (sessionStorage.user) {

      var user = JSON.parse(sessionStorage.user);
      console.log(user);

      $.ajax({
        type: 'GET',
        url: '/api/verify',
        headers: {
          'Authorization' : "Bearer " + user.token
        },
        success: function(data){
          console.log('dashboard was successfully shown');
          bodyRC.show(dashboard);
        },
        error: function(xhr, type){
          console.log('dashboard was not shown');
          console.log(arguments);
        }
      });
    } else {
      throw new Error("You are not logged in");
    }
  });
};
