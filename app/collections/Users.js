var env = process.env.NODE_ENV;
var path = require('path');
var dbConfig = require('../../config/db/knexfile')[env];
var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);

var User = require("../models/User");

var Users = bookshelf.Collection.extend({
  model: User
});

module.exports = Users;
