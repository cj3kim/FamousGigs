var Backbone = require('backbone');
var CompanyAd = require('../models/company_ad');
var callbacks = require('./zepto/callbacks');
var deferred = require('./zepto/deferred');
var $ = require('zepto-browserify').$;

callbacks($);
deferred($);

Backbone.$ = $;

var CompanyAds = Backbone.Collection.extend({
  url: '/company_ads'
});

module.exports = CompanyAds;
