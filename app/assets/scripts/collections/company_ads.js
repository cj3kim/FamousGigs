var Backbone = require('backbone');
var CompanyAd = require('../models/company_ad');

var CompanyAds = Backbone.Collection.extend({
  model: CompanyAd,
  url: '/company_ads'
});

module.exports = CompanyAds;
