'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table("users", function (t) {
    t.string("password").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("users", function (t) {
    t.dropColumn("password");
  });
};
