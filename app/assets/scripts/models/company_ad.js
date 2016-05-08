var Backbone = require('backbone');
var CompanyAd = Backbone.Model.extend({ 
  urlRoot: '/ad-details',
});

module.exports = CompanyAd;
