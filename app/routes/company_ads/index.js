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
}
