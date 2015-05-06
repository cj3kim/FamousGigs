var Backbone = require('backbone');
var User = require('../models/user');
var $ = require('zepto-browserify').$;


Backbone.$ = $;

var Users = Backbone.Collection.extend({
  model: User,
  url: '/company_ads'
});

module.exports = CompanyAds;
