var stripe = require("stripe")("sk_test_1WASPwzkx5thPhUjyW06SYXb");
var xss = require("xss");
var companyAdsRouteLogger = require('../../loggers/routes/index').company_ads;


module.exports = function (app) {
  var CompanyAds = require('../../models/company_ads');

  app.get('/company_ads', function(req, res) {
    CompanyAds.fetchAll()
    .then(function (models) {
      res.json(models.toJSON());
    })
    .catch(function (err) {
      companyAdsRouteLogger.error({error: err, req: req });
      res.sendStatus(501);
    });
  });

  app.post('/company_ads/create', function (req, res) {
    var companyAd = req.body;
    companyAd.title = xss(companyAd.title);
    companyAd.job_location = xss(companyAd.job_location);
    companyAd.description = xss(companyAd.description);
    companyAd.contact_email = xss(companyAd.contact_email);

    var charge = stripe.charges.create({
      amount: 1000, // amount in cents, again
      currency: "usd",
      source: companyAd.stripe_token,
      description: companyAd.contact_email
    }, function(err, charge) {
      if (err && err.type === 'StripeCardError') {
        companyAdsRouteLogger.error({error: err, req: req });
      } else {
        new CompanyAds(companyAd)
          .save()
          .then(function () {
            res.sendStatus(200);
          })
          .catch(function (err) {
            companyAdsRouteLogger.error({error: err, req: req });
            res.sendStatus(501);
          });
      }
    });
  });

  app.get('/ad-details/:id', function (req, res) {
    CompanyAds.where({id: req.params.id })
      .fetch()
      .then(function (model) {
        res.json(model.toJSON());
      })
      .catch(function (err) {
        companyAdsRouteLogger.error({error: err, req: req });
        res.sendStatus(501);
      })
  });
}
