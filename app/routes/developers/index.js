var User = require('../../models/User');
var Users = require('../../collections/Users');
var developerRouteLogger = require('../../loggers/routes/index').developers;

module.exports = function (app) {
  var whitelist = ['id','email', 'avatar_url', 'user_name', 'full_name'];

  app.get('/developers', function (req, res) {
    var users = new Users(); 

    users
      .fetch({ columns: whitelist })
      .then(function (collection) {
        res.json(collection.toJSON());
      })
      .catch(function (err) {
        developerRouteLogger.error({error: err, req: req});
        res.status(501).json({ error: err });
      });
      ;
  });

  app.get('/developers/:id', function (req, res) {
    var id = req.params.id;
    new User({id: id})
      .fetch({ columns: whitelist })
      .then(function (model) {
        res.json(model.attributes);
      })
      .catch(function (err) {
        developerRouteLogger.error({error: err, req: req});
        res.status(501).json({ error: err });
      });

  });

  app.put('/users/:id', function (req, res) {
    var id = req.params.id;
    new User({id: id})
      .fetch()
      .then(function (model) {
        return model.save(req.body);
      })
      .then(function (model) {
        developerRouteLogger.info({
          model: model.attributes
        }, 'User' + id + ' has been updated');
        res.json(model.attributes);
      })
      .catch(function (err) {
        developerRouteLogger.error({error: err, req: req});
        res.status(501).json({ error: err });
      });
  });
};

