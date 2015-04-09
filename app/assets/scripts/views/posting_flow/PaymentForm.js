var View = require('famous/core/view');
var React = require('react');
var ReactSurface = require('react-surface');

var FormContent = require('../../react_views/form_content');
var PaymentFormReact = require('../../react_views/components/payment_form');

var FlexColumns = require('flex-columns');

function PaymentForm () {
  FlexColumns.apply(this, arguments);
  this.createCol(500);

  var settings = {
    headerName: "Payment Form",
    reactClass: PaymentFormReact
  };

  var paymentForm = new ReactSurface({
    size: [500, 500],
    classes: ['rounded-corners'],
    content: <FormContent {...settings} />
  });

  paymentForm.on('next-view', function () {
    console.log('Go to next view.');
  });

  this.addSurfaceToCol(0, paymentForm)
}

PaymentForm.prototype = Object.create(FlexColumns.prototype);
PaymentForm.prototype.constructor = FlexColumns;

module.exports = PaymentForm;
