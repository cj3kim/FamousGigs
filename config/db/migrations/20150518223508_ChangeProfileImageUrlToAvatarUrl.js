'use strict';

exports.up = function(knex, Promise) {
   return knex.schema.table('users', function (t) {
    t.renameColumn('profile_image_url', 'avatar_url');
  }); 
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', function (t) {
    t.renameColumn('avatar_url', 'profile_image_url');
  });
  
};
