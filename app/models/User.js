var env = process.env.NODE_ENV;
var dbConfig = require('../../config/db/knexfile')[env];
var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);
var Promise = require('bluebird');
var bcrypt = require('bcryptjs');

Promise.promisifyAll(bcrypt);

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
      var storage = { user: null, samePassword: null };
      var fetchPromise = new this({email: email.toLowerCase().trim() })
        .bind(storage)
        .fetch({ require: true })
        .then(function (user) {
          this.user = user;
          return bcrypt.compareAsync(password, user.get('password'));
        })
        .then(function (samePassword) {
          if (!samePassword) throw new Error("Invalid email or password.");
          return resolve(this.user);
        })
        return fetchPromise;
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
