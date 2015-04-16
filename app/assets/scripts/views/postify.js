var AdForm = require('./posting_flow/AdForm');
var PaymentForm = require('./posting_flow/PaymentForm');
var CompanyDetails = require('./posting_flow/CompanyDetails');
var PaymentThanks = require('./posting_flow/PaymentThanks');
var Carousel = require('./Carousel');

module.exports = function () {

  var adForm = new AdForm({});
  var companyDetails =  new CompanyDetails();
  var paymentForm = new PaymentForm({});
  var paymentThanks = new PaymentThanks();

  var carousel = new Carousel([adForm, companyDetails, paymentForm, paymentThanks]);

  return carousel;
}


