
var mockData = require('./mock_developer_data');
var User = require('../../models/User');

module.exports = function (app) {
  app.get('/developers', function (req, res) {
    res.json(mockData);
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

