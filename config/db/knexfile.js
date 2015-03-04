// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host     : '127.0.0.1',
      port: 5432,
      user     : 'famous_gigs_admin',
      password : 'famous_gig_dev',
      database : 'famous_gigs_development',
      charset  : 'utf8'
    },
    migrations: {
      directory:'./migrations'
    },
    debug: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
