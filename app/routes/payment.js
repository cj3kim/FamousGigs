var stripe = require("stripe")("sk_test_1WASPwzkx5thPhUjyW06SYXb");

// (Assuming you're using express - expressjs.com)
// Get the credit card details submitted by the form

module.exports = function (app) {
  app.post('/payment', function (req, res) {
    console.log(req.body);
    var stripeToken = req.body.stripeToken;

    var charge = stripe.charges.create({
      amount: 1000, // amount in cents, again
      currency: "usd",
      source: stripeToken,
      description: "payinguser@example.com"
    }, function(err, charge) {
      if (err && err.type === 'StripeCardError') {
        console.log('charge failed');
        // The card has been declined
      } else {
        console.log('charge succeeded');
      }
    });
  });
};




