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

  app.get('/ad-details/:id', function (req, res) {
    CompanyAds.where({id: req.params.id })
      .fetch()
      .then(function (model) {
        res.json(model.toJSON());
      });
  });
}
