var Backbone = require('backbone');
var $ = require('zepto-browserify').$;
Backbone.$ = $;
var fs = require('fs');
var Mustache = require('mustache');


var templateString = fs.readFileSync(__dirname + '/../templates/company_ad.html', 'utf8');
var $template = $(templateString);

var CompanyAd = Backbone.View.extend({
  initialize: function () {
    this.el = Mustache.render(this.templateString, this.model.attributes)
    this.$el = $(this.el);
  },

  el: templateString,
  templateString: templateString
});

module.exports = CompanyAd;
