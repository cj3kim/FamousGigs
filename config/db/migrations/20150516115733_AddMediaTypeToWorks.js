'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('works', function (t) {
    t.dropColumn('video')
    t.string('media_type').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('works', function (t) {
    t.boolean('video').notNullable();
    t.dropColumn('media_type');
  });
};
