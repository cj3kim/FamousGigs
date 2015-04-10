var View = require('famous/core/view');
var React = require('react');
var ReactSurface = require('react-surface');

var FormContent = require('../../react_views/form_content');
var PaymentThanksReact =  require('../../react_views/components/payment_thanks');

var FlexColumns = require('flex-columns');

function PaymentThanks () {
  FlexColumns.apply(this, arguments);
  var _this = this;

  this.createCol(425);

  var settings = {
    headerName: "Thank You",
    reactClass: PaymentThanksReact 
  };

  var paymentThanks = new ReactSurface({
    size: [425, 320],
    classes: ['rounded-corners'],
    content: <FormContent {...settings} />
  });

  paymentThanks.on('last-view', function (event) {
    event.stopPropagation();
    _this._eventOutput.trigger('last-view');
  });

  this.addSurfaceToCol(0, paymentThanks)
};

PaymentThanks.prototype = Object.create(FlexColumns.prototype);
PaymentThanks.prototype.constructor = FlexColumns;

module.exports = PaymentThanks;
