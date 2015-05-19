'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (t) {
    t.string('github_id');
  }); 
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function (t) {
    t.dropColumn('github_id');
  });
};
