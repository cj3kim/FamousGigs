var View = require('famous/core/view');
var React = require('react');
var ReactSurface = require('react-surface');

var FormContent = require('../../react_views/form_content');
var PaymentThanksReact =  require('../../react_views/components/payment_thanks');

var FlexColumns     = require('../flex-columns/index');

function PaymentThanks () {
  FlexColumns.apply(this, arguments);
  var _this = this;

  var settings = {
    headerName: "Thank You",
    reactClass: PaymentThanksReact 
  };

  var paymentThanks = new ReactSurface({
    classes: ['rounded-corners'],
    content: <FormContent {...settings} />
  });

  paymentThanks.on('last-view', function (event) {
    event.stopPropagation();
    _this._eventOutput.trigger('last-view');
  });

  this.createCol(425);
  this.addColNode(0, paymentThanks, [425, 320])
};

PaymentThanks.prototype = Object.create(FlexColumns.prototype);
PaymentThanks.prototype.constructor = FlexColumns;

module.exports = PaymentThanks;
