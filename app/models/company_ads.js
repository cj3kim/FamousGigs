
var env = process.env.NODE_ENV;
var dbConfig = require('../../config/db/knexfile')[env];
var knex = require('knex')(dbConfig);

var bookshelf = require('bookshelf')(knex);

var CompanyAds = bookshelf.Model.extend({
  tableName: 'company_ads',
  hasTimestamps: true
});

module.exports = CompanyAds;
