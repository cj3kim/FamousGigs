var User = require('../../models/User');
var Users = require('../../collections/Users');

module.exports = function (app) {
  app.get('/developers', function (req, res) {
    var users = new Users(); 

    users.fetch({
      columns: ['email', 'avatar_url', 'user_name', 'full_name']
    })
    .then(function (collection) {
      res.json(collection.toJSON());
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
        console.log('successfully saved the user')
        res.json(model.attributes);
      })
      .catch(function (err) {
        console.log(err);
      });
  });
};

