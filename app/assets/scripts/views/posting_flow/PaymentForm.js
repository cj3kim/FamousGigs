var View = require('famous/core/view');
var React = require('react');
var ReactSurface = require('react-surface');

var GeneralContent          = require('../../react_views/general_content');
var FormContent             = require('../../react_views/form_content');
var PaymentFormReact        = require('../../react_views/components/payment_form');
var PaymentExplanationReact = require('../../react_views/components/payment_explanation');

var FlexColumns = require('../flex-columns/index');

function PaymentForm () {
  FlexColumns.apply(this, arguments);
  var _this = this;

  var paymentFormSettings = {
    headerName: "Payment Form",
    reactClass: PaymentFormReact
  };

  var paymentForm = new ReactSurface({
    classes: ['rounded-corners'],
    content: <FormContent {...paymentFormSettings} />
  });

  var paymentExplanationSettings = {
    headerName: "Pricing",
    reactClass: PaymentExplanationReact
  };

  var paymentExplanation = new ReactSurface({
    classes: ['rounded-corners'],
    content: <GeneralContent {...paymentExplanationSettings} />
  });

  paymentForm.on('stripe-payment', function (event, data) {
    event.stopPropagation();
    _this._eventOutput.trigger('stripe-payment', event._args[0]);
  });

  this.createCol(350);
  this.addColNode(0, paymentForm, [350,300]);

  this.createCol(200);
  this.addColNode(1, paymentExplanation, [200,200]);
}

PaymentForm.prototype = Object.create(FlexColumns.prototype);
PaymentForm.prototype.constructor = FlexColumns;

module.exports = PaymentForm;
