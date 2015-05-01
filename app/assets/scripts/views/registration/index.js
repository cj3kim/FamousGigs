var View         = require('famous/core/view');
var React        = require('react');
var ReactSurface = require('react-surface');
var page         = require('page');

var FormContent  = require('../../react_views/form_content');
var FlexColumns  = require('../flex-columns/flex-columns');
var $ = require('zepto-browserify').$;
var objectMerge     = require('object-merge');

var RegistrationReact = require('../../react_views/components/dev_registration_form');

function Registration () {
  FlexColumns.apply(this, arguments);
  var _this = this;
  var props = this.options.props;

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

  registration.on('user-registration', function (data) {
    var obj = data._args[0]; //{ user: {} }
    $.post('/api/registration', obj, function (response) {
      page.show('/dashboard');
    });
  });

  registration.on('user-login', function (data) {
    var obj = data._args[0]; //{ user: {} }
    $.post('/api/login', obj, function (response) {
      page.show('/dashboard');
    });
  });

  this.createCol(425);
  this.addColNode(0, registration, [425, 500])
};

Registration.prototype = Object.create(FlexColumns.prototype);
Registration.prototype.constructor = Registration;

module.exports = Registration;