var env = process.env.NODE_ENV;
var dbConfig = require('../../config/db/knexfile')[env];
var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);
var Promise = require('bluebird');
var bcrypt = require('bcryptjs');
var randomstring = require("randomstring");

Promise.promisifyAll(bcrypt);

var User = bookshelf.Model.extend({
    tableName: 'users',
    hasTimestamps: true,
    initialize: function () {
      //this.on('saving', this.validateSave);
    },
    //validateSave: function () {
      //return checkit(rules).run(this.attributes);
    //},
  },

  {
    findOrCreate: function (options) {
      var _this = this;
      var user      = options.user;
      var github_id = options.github_id;
      console.log('findOrCreate');
      console.log(options);

      if (github_id && user) {
        return this.where({github_id: github_id})
            .fetch()
            .then(function (model) {
              if (model === null) {
                console.log('_this');
                console.log(_this);
                return new _this({
                  email:      user.email, user_name:  user.login,
                  full_name:  user.name, avatar_url: user.avatar_url,
                  github_id:  github_id, password:   randomstring.generate()
                }).save();

              } else {
                return Promise.resolve(model);
              }
            });
      } else {
        console.log('error');
        console.log(_this);
        return Promise.reject(new Error('couldnt find the user'))
      }
    },
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
          return this.user
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
