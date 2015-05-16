module.exports = function (app) {
  var Works = require('../../models/Works');

  app.get('/works', function(req, res) {
    Works.fetchAll()
    .then(function (models) {
      res.json(models.toJSON());
    })
    .catch(function (err) {
      console.log(err);
    });
  });

  app.post('/works/create', function (req, res) {
  });

  app.put('/work/update', function (req,res) {

  });

  app.get('/work/:id', function (req, res) {
  });
}
