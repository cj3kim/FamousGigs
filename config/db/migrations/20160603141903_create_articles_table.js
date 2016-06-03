'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', function(t) {
    t.increments().primary();
    t.string('title').notNullable();
    t.text('content').nullable();
    t.string('author').notNullable();
    t.string('email').notNullable();
    t.json('json_data');
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles');
};
