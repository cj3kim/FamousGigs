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

//'use strict';
//var nameGen = require('project-name-generator').generate;
//var loremIpsum = require('lorem-ipsum');

//exports.seed = function(knex, Promise) {
  //knex('users').del().then(function () {
    //var userCount = 5;
    //for (var i = 0, l = userCount; i < l; i ++) {

      //var id = i + 1;
      //var description = loremIpsum({units: 'paragraphs', count: 2});
      //var name = nameGen().dashed;
      //var email = name + "@gmail.com";

      //knex('users').insert({ email: email})
        //.then(function () {
          //knex('company_ads').insert({
            //title: "Looking for Famous Developer",
            //description: description,
            //email: email,
            //user_id: id
          //});
        //});
    //}
  //});
//};
