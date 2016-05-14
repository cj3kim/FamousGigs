var Backbone = require('backbone');

var Work = Backbone.RelationalModel.extend({
  urlRoot: '/work'
});

module.exports = Work;
