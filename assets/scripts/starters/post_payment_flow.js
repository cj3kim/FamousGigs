var AdForm         = require('../views/posting_flow/AdForm');
var PaymentForm    = require('../views/posting_flow/PaymentForm');
var CompanyDetails = require('../views/posting_flow/CompanyDetails');
var PaymentThanks  = require('../views/posting_flow/PaymentThanks');
var Carousel       = require('../views/Carousel');

module.exports = function () {

  var adForm = new AdForm({});
  var companyDetails =  new CompanyDetails();
  var paymentForm = new PaymentForm({gutterCol: 40, gutterRow: 20});
  var paymentThanks = new PaymentThanks();

  var carousel = new Carousel([adForm, companyDetails, paymentForm, paymentThanks]);

  return carousel;
}


