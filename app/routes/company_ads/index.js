var stripe = require("stripe")("sk_test_1WASPwzkx5thPhUjyW06SYXb");
var xss = require("xss");
var companyAdsRouteLogger = require('../../loggers/routes/index').company_ads;
var Moment = require("moment");
var ObjectId = require("node-time-uuid");

function boolScraper(input) {
  if (input === "true") {
    return true;
  } else if (input === "false" || input === "undefined") {
    return false;
  } else {
    return input
  }
}

module.exports = function (app) {
  var CompanyAds = require('../../models/company_ads');

  app.get('/company_ads', function(req, res) {
    CompanyAds.query(function (qb) {
                qb.orderBy("created_at", "DESC");
               })
              .fetchAll()
              .then(function (models) {
                res.json(models.toJSON());
              })
              .catch(function (err) {
                companyAdsRouteLogger.error({error: err, req: req });
                res.sendStatus(501);
              });
  });

  app.post('/company_ads/create', function (req, res) {
    var _companyAd = req.body;
    var companyAd = Object.keys(_companyAd)
                      .reduce(function (accum, key) {
                        var val    = xss(_companyAd[key]);
                        accum[key] =  boolScraper(val);
                        return accum;
                      }, {});
    var uuidBuffer = new ObjectId();
    companyAd.uuid = uuidBuffer.toString();

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
          .then(function () { res.sendStatus(200); })
          .catch(function (err) {
            companyAdsRouteLogger.error({error: err, req: req });
            res.sendStatus(501);
          });
      }
    });
  });

  app.get('/ad_details/:uuid', function (req, res) {
    CompanyAds.where({uuid: req.params.uuid })
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
