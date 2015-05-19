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


  app.get('/work/:id', function (req, res) {
    //Works.where({id: id})
      //.then(function (model) {
        //res.json(model.toJSON());
      //})
      //.catch(function (err) {
      //});
  });

  app.get('/user/:user_id/works', function (req,res) {
    var user_id = req.params.user_id;
    Works
      .where({user_id: user_id})
      .fetchAll()
      .then(function (models) {
        console.log(models);
        res.json(models.toJSON())
      })
      .catch(function (err) {
        console.log(err);
      });
  });

  app.post('/user/:user_id/works', function (req, res) {
    var user_id = req.params.user_id;
    var attrs   = req.body.work;
    attrs.user_id = user_id;

    var work = new Works();
    work
      .save(attrs)
      .then(function (model) {
        res.json(model)
      })
      .catch(function (err) {
        res.status(501);
      });
  });

  app.put('/user/:user_id/work/:work_id', function (req,res) {

  });

  app.delete('/user/:user_id/work/:work_id', function (req,res) {

  });

}
