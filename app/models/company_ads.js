
var dbConfig = require('../../config/db/config')['development'];
var knex = require('knex')(dbConfig);

var bookshelf = require('bookshelf')(knex);

var CompanyAds = bookshelf.Model.extend({
  tableName: 'company_ads'
});

module.exports = CompanyAds;
