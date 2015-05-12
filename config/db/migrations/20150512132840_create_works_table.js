'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('works', function (t) {
    t.increments().primary();
    t.string('title')
    t.text('description');
    t.boolean('video').notNullable();
    t.string('url').notNullable();

    t.string('created_at').notNullable().defaultTo(knex.raw('now()'));
    t.string('updated_at').notNullable().defaultTo(knex.raw('now()'));

    t.integer('user_id')
      .references('id').inTable('users')
      .index().notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('works');
};
