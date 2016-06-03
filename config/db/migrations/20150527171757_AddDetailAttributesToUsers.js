'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (t) {
    t.string('city');
    t.string('state');
    t.string('country');
    t.string('about_tagline');
    t.text('bio');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function (t) {
    t.dropColumn('city');
    t.dropColumn('state');
    t.dropColumn('country');
    t.dropColumn('about_tagline');
    t.dropColumn('bio');
  });
};
