'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(t) {
    t.increments().primary();
    t.string('email').notNullable();
    t.string('user_name').nullable();
    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
