exports.up = function(knex, Promise) {
  return knex.schema.table("company_ads", function (t) {
    t.string("charge_id").unique();
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.table("company_ads", function (t) {
    t.dropColumn("charge_id");
  });
};

