'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table("users", function (t) {
    t.string("created_at").notNullable().defaultTo(knex.raw('now()'));
    t.string("email").notNullable().index().unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("users", function (t) {
    t.dropColumn("created_at");
    t.dropColumn("email");
  });
};
