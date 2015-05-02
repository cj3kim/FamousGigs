var env = process.env.NODE_ENV;
var dbConfig = require('../../config/db/knexfile')[env];
var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);
var Promise = require('bluebird');
var bcrypt = require('bcryptjs');

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
          return bcrypt.compareAsync(user.get('password'), password);
        });
    }),

    register: Promise.method(function(email, password, passwordConfirmation) {
      if (password !== passwordConfirmation) throw new Error("Passwords don't match.");

      //TODO Think about why it's important to implement this asynchronously.
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);

      return new this({
          email: email.toLowerCase().trim(),
          password: hash
        }).save();
    })
  }
);

module.exports = User;
