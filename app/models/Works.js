var env = process.env.NODE_ENV;
var dbConfig = require('../../config/db/knexfile')[env];
var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);
var Promise = require('bluebird');
var bcrypt = require('bcryptjs');

Promise.promisifyAll(bcrypt);

var Work = bookshelf.Model.extend({
    tableName: 'works',
    initialize: function () {},
    defaults: {
      title: "write a title",
      description: "",
      media_type: "",
      url: "",
      user_id: ""
    }
});

module.exports = Work;
