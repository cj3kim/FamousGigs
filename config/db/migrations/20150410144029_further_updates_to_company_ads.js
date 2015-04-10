'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table("company_ads", function (t) {
    t.string("stripe_token");
    t.string("contact_name");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("company_ads", function (t) {
    t.dropColumn("stripe_token");
    t.dropColumn("contact_name");
  });
};
