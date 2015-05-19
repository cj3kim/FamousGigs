'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (t) {
    t.string('profile_image_url');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function (t) {
    t.dropColumn('profile_image_url');
  });
};
