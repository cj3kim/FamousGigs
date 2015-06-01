


var Promise = require('bluebird');
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
    attrs.title = xss(attrs.title);
    attrs.description = xss(attrs.description);
    attrs.media_type = xss(attrs.media_type);
    attrs.url = xss(attrs.url);

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

  app.put('/user/:user_id/works/:work_id', function (req,res) {

  });

  app.delete('/user/:user_id/works/:work_id', function (req,res) {
    var user_id = req.params.user_id;
    var work_id = req.params.work_id;

    Works
      .where({user_id: user_id, id: work_id })
      .fetch()
      .then(function (model) {
        console.log(model);
        return Promise.resolve(model.destroy());
      })
      .then(function (model) {
        res.status(200).json(model);
      })
      .catch(function () {
        res.sendStatus(500);
      })
  });

}
