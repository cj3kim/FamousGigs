var Backbone = require('backbone');
var $ = require('zepto-browserify').$;
var FamousGigsDispatcher = require('../dispatcher');
Backbone.$ = $;

var UserWork = Backbone.Model.extend({});

var UserWorkCollection = Backbone.Collection.extend({
  initialize: function (options) {
    this.dispatchToken = FamousGigsDispatcher.register(this.dispatchCallback);
  },

  setUserId: function (user_id) {
    this.user_id = user_id;
  },

  url: function () {
    return '/user/' + this.user_id + '/works';
  },

  model: UserWork,
  dispatchCallback: function (payload) {
    switch (payload.actionType) {
      case 'case':
        break;
      default:
    }
  }
});


module.exports = UserWorkCollection;
