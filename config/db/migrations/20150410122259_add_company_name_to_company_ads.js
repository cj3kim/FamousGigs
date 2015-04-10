'use strict';

exports.up = function(knex, Promise) {
  knex.schema.table('company_ads', function (t) {
    t.string('company_name');
  });
};

exports.down = function(knex, Promise) {
  knex.schema.table('company_ads', function (t) {
    t.dropColumn('company_name');
  });
};
