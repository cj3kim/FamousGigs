var Backbone = require('backbone');
var $ = require('zepto-browserify').$;
var FamousGigsDispatcher = require('../dispatcher');
Backbone.$ = $;

var Work = Backbone.Model.extend({});

var WorkCollection = Backbone.Collection.extend({
  model: Work,
  url: '/works'
  initialize: function () {
    this.dispatchToken = FamousGigsDispatcher.register(this.dispatchCallback);
  },
  dispatchCallback: function (payload) {
    switch (payload.actionType) {
      case 'case':
        break;
      default:
    }
  };
});

var Works = new WorkCollection();

module.exports = Works;
