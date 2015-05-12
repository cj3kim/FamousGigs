var Backbone = require('backbone');
var $ = require('zepto-browserify').$;
var FamousGigsDispatcher = require('../dispatcher');
Backbone.$ = $;

var WorkCollection = Backbone.Collection.extend({
  url: '/works',
  initialize: function () {
    this.dispatchToken = FamousGigsDispatcher.register(this.dispatchCallback);
  },
  dispatchCallback: function (payload) {
    switch (payload.actionType) {
      case 'case':
        break;
      default:
    }
  }
});


module.exports = WorkCollection;
