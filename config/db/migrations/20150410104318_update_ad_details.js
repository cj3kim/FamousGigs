'use strict';

exports.up = function(knex, Promise) {
  
  return knex.schema.table('company_ads', function (t) {
    t.dropColumn('user_id')
    t.renameColumn('email', 'contact_email');

    t.boolean('full_time').nullable();
    t.boolean('part_time').nullable();
    t.boolean('gig').nullable();
    t.boolean('onsite').nullable();
    t.boolean('remote').nullable();

    t.string('logo_url').nullable()

    t.string('company_name'); 
    t.string('company_email');
    t.string('company_link');
    t.text('additional_notes');;
    // Since rows already exist in the table, the ALTER statment is attempting 
    // to insert NULL values for columsn with existing rows.
    // Not nullable but fix at a later point. 
  });
};

exports.down = function(knex, Promise) {
  
};
