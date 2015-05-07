var Backbone = require('backbone');
var $ = require('zepto-browserify').$;
var FamousGigsDispatcher = require('../dispatcher');

var Developer = Backbone.Model.extend({});

var DeveloperCollection = Backbone.Collection.extend({
  model: Developer,
  url: '/developers'
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

var Developers = new DeveloperCollection();

module.exports = Developers;
