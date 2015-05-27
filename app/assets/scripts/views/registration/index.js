var View         = require('famous/core/View');
var React        = require('react');
var ReactSurface = require('react-surface');
var page         = require('page');

var FormContent  = require('../../react_views/form_content');
var FlexColumns  = require('../flex-columns/index');
var $ = require('zepto-browserify').$;
var objectMerge     = require('object-merge');
var NotificationView = require('../notification/index');

var RegistrationReact = require('../../react_views/components/dev_registration_form');
var user = require("../../models/singleton/user");

function Registration () {
  FlexColumns.apply(this, arguments);
  var _this = this;
  var props = this.options.props;
  var notificationView = new NotificationView();

  var settings = {
    headerName: props.headerName || "Registration",
    submitCopy: props.submitCopy || "Sign up",
    reactClass: RegistrationReact,
    login: props.login | false
  };

  var registration = new ReactSurface({
    classes: ['rounded-corners'],
    content: <FormContent {...settings} />
  });

  this.createCol(425);
  if (props.login) {
    this.addColNode(0, registration, [300, 225])
    registration.on('user-login', function (data) {
      var obj = data._args[0]; //{ user: {} }

      user.login(obj)
        .then(function (userData) {
          page.show('/dashboard');
        })
        .catch(function (err) {
          notificationView._eventInput.emit('new-notification', err)
        });
    });
  } else {
    registration.on('user-registration', function (data) {
      var obj = data._args[0]; //{ user: {} }

      user.register(obj)
        .then(function (data) {
          page.show('/dashboard')
        })
        .catch(function(err) {
          notificationView._eventInput.emit('new-notification', err)
        });
    });
    this.addColNode(0, registration, [425, 500])
  }

};

Registration.prototype = Object.create(FlexColumns.prototype);
Registration.prototype.constructor = Registration;

module.exports = Registration;
