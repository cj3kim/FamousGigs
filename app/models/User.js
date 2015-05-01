var env = process.env.NODE_ENV;
var dbConfig = require('../../config/db/knexfile')[env];
var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);
var Promise = require('bluebird');

var User = bookshelf.Model.extend({
    tableName: 'users',
    initialize: function () {
      //this.on('saving', this.validateSave);
    },
    //validateSave: function () {
      //return checkit(rules).run(this.attributes);
    //},
  },
  {
    login: Promise.method(function (email, password) {
      if (!email || !password) throw new Error("Email and password are both required.");
      return new this({ email: email.toLowerCase().trim() })
        .fetch({ require: true })
        .tap(function (user) {
          return bcrypt.compareAsync(customer.get('password'), password);
        });
    })
  }
);

module.exports = User;
