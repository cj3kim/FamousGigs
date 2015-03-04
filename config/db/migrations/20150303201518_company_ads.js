'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('company_ads', function(t) {
    t.increments().primary();
    t.string('title').notNullable();
    t.text('description').nullable();
    t.string('job_location').notNullable();
    t.string('email').notNullable();
    t.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users');

    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('company_ads');
};
