var stripe = require("stripe")("sk_test_1WASPwzkx5thPhUjyW06SYXb");
var xss = require("xss");
var companyAdsRouteLogger = require('../../loggers/routes/index').company_ads;
var Moment = require("moment");


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

  function boolScraper(input) {
    if (input==="true") {
      return true;
    } else if (input === "false" || input === "undefined") {
      return false;
    } else {
      return input
    }
  }
  app.post('/company_ads/create', function (req, res) {
    var _companyAd = req.body;
    var companyAd = Object.keys(_companyAd)
                      .reduce(function (accum, key) {
                        var val    = xss(_companyAd[key]);
                        accum[key] =  boolScraper(val);
                        return accum;
                      }, {});
    var charge = stripe.charges.create({
      amount: 5000, // amount in cents, again
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

            console.log('==> err', err);
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
