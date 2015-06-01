var stripe = require("stripe")("sk_test_1WASPwzkx5thPhUjyW06SYXb");
var xss = require("xss");

module.exports = function (app) {
  var CompanyAds = require('../../models/company_ads');

  app.get('/company_ads', function(req, res) {
    CompanyAds.fetchAll()
    .then(function (models) {
      res.json(models.toJSON());
    })
    .catch(function (err) {
      console.log(err);
    });
  });

  app.post('/company_ads/create', function (req, res) {
    var companyAd = req.body;
    companyAd.title = xss(companyAd.title);
    companyAd.job_location = xss(companyAd.job_location);
    companyAd.description = xss(companyAd.description);
    companyAd.contactEmail = xss(companyAd.contact_email);

    var charge = stripe.charges.create({
      amount: 1000, // amount in cents, again
      currency: "usd",
      source: companyAd.stripeToken,
      description: companyAd.contactEmail
    }, function(err, charge) {
      if (err && err.type === 'StripeCardError') {
        console.log('charge failed');
        console.log(err);
      } else {
        new CompanyAds(companyAd).save()
          .then(function () {
            res.sendStatus(200);
          });
      }
    });
  });

  app.get('/ad-details/:id', function (req, res) {
    CompanyAds.where({id: req.params.id })
      .fetch()
      .then(function (model) {
        res.json(model.toJSON());
      });
  });
}
