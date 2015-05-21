var Backbone = require('backbone');
var $ = require('zepto-browserify').$;
Backbone.$ = $;
require('backbone-relational')

var FamousGigsDispatcher = require('../../dispatcher');
var Promise = require('bluebird');

var WorkCollection = require('../../collections/user_works');

var User = Backbone.RelationalModel.extend({
  urlRoot: '/users',

  idAttribute: 'id',

  initialize: function () {
    var _this = this;
    this.dispatchToken = FamousGigsDispatcher.register(this.dispatchCallback);
    this.checkForSession();
    this.works = new WorkCollection();

    this.on('change', function () {
      if (_this.hasChanged('id'))
        _this.works.setUserId(_this.get('id'));
    });
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
      this.set(user);
    }
  },
  verifySession: function () {
    var userSession;
    if (sessionStorage.user) {
      userSession = JSON.parse(sessionStorage.token_info);

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
    .then(function (data) {
      sessionStorage.setItem("user", JSON.stringify(data.user));
      sessionStorage.setItem("token_info", JSON.stringify(data.token_info));
      _this.set(data.user);

      return Promise.resolve(_this);
    });
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
      sessionStorage.setItem("user", JSON.stringify(data.user));
      sessionStorage.setItem("token_info", JSON.stringify(data.token_info));
      _this.set(data.user);
      return Promise.resolve(userData);
    });
    return promise;
  }
});

//we return a singleton here
module.exports = new User();
