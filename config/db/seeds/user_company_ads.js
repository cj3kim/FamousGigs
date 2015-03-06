var dbConfig = require('../knexfile')[process.env.NODE_ENV];
var knex = require('knex')(dbConfig);

var nameGen = require('project-name-generator').generate;
var loremIpsum = require('lorem-ipsum');

(function() {
  knex('users').del().then(function () {
    var userCount = 5;
    for (var i = 0, l = userCount; i < l; i ++) {

      var description = loremIpsum({units: 'paragraphs', count: 2});
      var name = nameGen().dashed;
      var email = name + "@gmail.com";

      knex('users').insert({ email: email, created_at: new Date(), updated_at: new Date() })
        .returning('id')
        .then(function (ary) {
          var id = ary[0];

          knex('company_ads').insert({
            title: "Looking for Famous Developer",
            job_location: "San Francisco",
            description: description,
            email: email,
            user_id: id
          }).then(function (model) {
          });;
        });
    }
  });
})();

