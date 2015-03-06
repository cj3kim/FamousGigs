'use strict';
var nameGen = require('project-name-generator').generate;
var loremIpsum = require('lorem-ipsum');



exports.seed = function(knex, Promise) {

    return Promise.join(
        // Deletes ALL existing entries
        knex('users').del(),
        knex('users').insert({email: nameGen().dashed + "@gmail.com", created_at: new Date(), updated_at: new Date()}),
        knex('users').insert({email: nameGen().dashed + "@gmail.com", created_at: new Date(), updated_at: new Date()}),
        knex('users').insert({email: nameGen().dashed + "@gmail.com", created_at: new Date(), updated_at: new Date()}),
        knex('users').insert({email: nameGen().dashed + "@gmail.com", created_at: new Date(), updated_at: new Date()}),
        knex('users').insert({email: nameGen().dashed + "@gmail.com", created_at: new Date(), updated_at: new Date()})
    );
};

