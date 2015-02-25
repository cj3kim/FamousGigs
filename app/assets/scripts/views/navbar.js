var Backbone = require('backbone');
var $ = require('zepto-browserify').$;
Backbone.$ = $;
var fs = require('fs');

var templateString = fs.readFileSync(__dirname + '/../templates/navbar.html', 'utf8');
var $template = $(templateString);

var Navbar = Backbone.View.extend({
  initialize: function () {}, 
  el: templateString,
});

module.exports = Navbar;
