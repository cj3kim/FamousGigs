var Backbone = require('backbone');
var $ = require('zepto-browserify').$;
var FamousGigsDispatcher = require('../dispatcher');
Backbone.$ = $;

var User = Backbone.Model.extend({});

var UserCollection = Backbone.Collection.extend({
  model: User,
  url: '/users'
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


module.exports = UserCollection;
