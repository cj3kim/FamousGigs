var Backbone = require('backbone');
var $ = require('zepto-browserify').$;
Backbone.$ = $;
var fs = require('fs');

var templateString = fs.readFileSync(__dirname + '/../templates/company_ad.html', 'utf8');
var $template = $(templateString);

var CompanyAd = Backbone.View.extend({
  initialize: function () {},
  el: templateString,
});

module.exports = CompanyAd;
