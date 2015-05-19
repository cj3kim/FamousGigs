'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (t) {
    t.integer('github_id');
  }); 
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function (t) {
    t.dropTable('github_id');
  });
};
