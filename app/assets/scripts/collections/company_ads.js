var Backbone = require('backbone');
var CompanyAd = require('../models/company_ad');

var $ = require('zepto-browserify').$;
Backbone.$ = $;

var CompanyAds = Backbone.Collection.extend({
  model: CompanyAd,
  url: '/company_ads'
});

module.exports = CompanyAds;
