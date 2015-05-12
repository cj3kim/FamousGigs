var Backbone = require('backbone');
var $ = require('zepto-browserify').$;
Backbone.$ = $;
require('backbone-relational')

var FamousGigsDispatcher = require('../../dispatcher');
var Promise = require('bluebird');

var Work = require('../work');
var WorkCollection = require('../../collections/works');

var User = Backbone.RelationalModel.extend({
  relations: [{
		type: Backbone.HasMany,
		key: 'user_id',
		relatedModel: Work,
		collectionType: WorkCollection,
		reverseRelation: {
			key: 'id',
			includeInJSON: 'id'
			// 'relatedModel' is automatically set to 'Zoo'; the 'relationType' to 'HasOne'.
		}
	}],

  urlRoot: '/user',
  initialize: function () {
    this.dispatchToken = FamousGigsDispatcher.register(this.dispatchCallback);
    this.checkForSession();
  },
  dispatchCallback: function (payload) {
    switch (payload.actionType) {
      case 'case':
        break;
      default:
    }
  },
  checkForSession: function () {
    var sessionUser = window.sessionStorage.user;
    if (sessionUser) {
      var user = JSON.parse(sessionStorage.user);
      this.set({id: user.id, email: user.email });
    }
  },
  verifySession: function () {
    var userSession;
    if (sessionStorage.user) {
      userSession = JSON.parse(sessionStorage.user);

      return Promise.resolve(
        $.ajax({
          type: 'GET',
          url: '/api/verify',
          headers: { 'Authorization' : "Bearer " + userSession.token }})
      );
    } else {
      throw new Error("You're not logged in.")
    }
  },
  login: function (postData) {
    var _this = this;
    return  Promise.resolve(
      $.ajax({
        type: 'POST',
        url: '/api/login',
        data: JSON.stringify(postData),
        contentType: 'application/json',
      })
    )
    .then(function (userData) {
      sessionStorage.setItem("user", JSON.stringify(userData));
      _this.set({id: userData.id, email: userData.email});

      return Promise.resolve(userData);
    })
  },
  register: function (postData) {
    var _this = this;
    var promise = Promise.resolve(
      $.ajax({
        type: 'POST',
        url: '/api/registration',
        data: JSON.stringify(postData),
        contentType: 'application/json'
      })
    );
    promise.then(function (userData) {
      sessionStorage.setItem("user", JSON.stringify(userData));
      console.log(userData);
      _this.set({id: userData.id, email: userData.email});

      return Promise.resolve(userData);
    })
    return promise;
  }
});

//we return a singleton here
module.exports = new User();
