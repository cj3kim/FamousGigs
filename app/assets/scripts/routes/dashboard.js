var dashboard = require('../views/dashboard/index');
var $ = require('zepto-browserify').$;

module.exports = function (page, obj) {
  var bodyRC = obj.bodyRC;

  console.log($);
  //TODO do an api verificatio check
  page('/dashboard', function () {
    console.log('dashboard');

    $.ajax({
      type: 'GET',
      url: '/api/verify',
      success: function(data){
        console.log(data);
        console.log(arguments);
        bodyRC.show(dashboard);
      },
      error: function(xhr, type){
        console.log(arguments);
      }
    });
  });
};
