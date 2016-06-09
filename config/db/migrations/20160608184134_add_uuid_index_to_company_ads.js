
exports.up = function(knex, Promise) {
  return knex.schema.table("company_ads", function (t) {
    t.string("uuid").unique();
    t.index("uuid");
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.table("company_ads", function (t) {
    t.dropColumn("uuid")
  });
};
