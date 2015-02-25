
var dbConfig = require('./config');
var knex = require('knex')(dbConfig['development']);

knex.schema.createTable('company_ads', function (table) {
  table.increments();
  table.string('title');
  table.text('description');
  table.string('job_location')
  table.string('email');
  table.timestamps();
})
.then(function (success) {
  console.log('success');
  console.log(success);
}) 
.catch(function (err) {
  console.log(err);
});
