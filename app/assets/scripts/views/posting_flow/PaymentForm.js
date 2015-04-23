var View = require('famous/core/view');
var React = require('react');
var ReactSurface = require('react-surface');

var FormContent = require('../../react_views/form_content');
var PaymentFormReact = require('../../react_views/components/payment_form');

var FlexColumns = require('../flex-columns/flex-columns');

function PaymentForm () {
  FlexColumns.apply(this, arguments);
  var _this = this;

  var settings = {
    headerName: "Payment Form",
    reactClass: PaymentFormReact
  };

  var paymentForm = new ReactSurface({
    classes: ['rounded-corners'],
    content: <FormContent {...settings} />
  });

  paymentForm.on('stripe-payment', function (event, data) {
    event.stopPropagation();

    _this._eventOutput.trigger('stripe-payment', event._args[0]);
  });

  this.createCol(500);
  this.addColNode(0, paymentForm, [500,500]);
}

PaymentForm.prototype = Object.create(FlexColumns.prototype);
PaymentForm.prototype.constructor = FlexColumns;

module.exports = PaymentForm;
