var View = require('famous/core/view');
var React = require('react');
var ReactSurface = require('react-surface');

var PaymentFormReact = require('../react_views/payment_form');

var FlexColumns = require('flex-columns');

function PaymentForm () {
  FlexColumns.apply(this, arguments);

  this.createCol(500);

  var adForm = new ReactSurface({
    size: [500, 500],
    classes: ['rounded-corners'],
    content: <PaymentFormReact />
  });

  this.addSurfaceToCol(0, adForm)
}

PaymentForm.prototype = Object.create(FlexColumns.prototype);
PaymentForm.prototype.constructor = FlexColumns;

module.exports = PaymentForm;
