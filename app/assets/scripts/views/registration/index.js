var View         = require('famous/core/view');
var React        = require('react');
var ReactSurface = require('react-surface');

var FormContent  = require('../../react_views/form_content');
var FlexColumns  = require('../flex-columns/flex-columns');

var RegistrationReact = require('../../react_views/components/dev_registration_form');

function Registration () {
  FlexColumns.apply(this, arguments);
  var _this = this;

  var settings = {
    headerName: "Registration",
    reactClass: RegistrationReact 
  };

  var registration = new ReactSurface({
    classes: ['rounded-corners'],
    content: <FormContent {...settings} />
  });

  this.createCol(425);
  this.addColNode(0, registration, [425, 500])
};

Registration.prototype = Object.create(FlexColumns.prototype);
Registration.prototype.constructor = FlexColumns;

module.exports = Registration;
