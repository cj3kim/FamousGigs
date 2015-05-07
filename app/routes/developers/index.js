
var mockData = require('./mock_developer_data');

module.exports = function (app) {
  app.get('/developers', function (req, res) {
    res.json(mockData);
  });
};

