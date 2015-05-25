// Update with your config settings.


var FG_PG_PASSWORD;

switch (process.env.NODE_ENV) {
  case 'development':
    FG_PG_PASSWORD = 'famous_givs_dev'
    break;
  case 'staging':
    FG_PG_PASSWORD = process.env.FG_STAGING_PG_PASSWORD
    break;
  case 'production':
    FG_PG_PASSWORD = process.env.FG_PRODUCTION_PG_PASSWORD
    break
  default:
    // code
}

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host     : '127.0.0.1',
      port: 5432,
      user     : 'famous_gigs_admin',
      password : FG_PG_PASSWORD,
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
      database: 'famous_gigs_staging',
      port: 5432,
      user:     'famous_gigs_admin',
      password: FG_PG_PASSWORD,
      charset  : 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory:'./migrations',
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'famous_gigs_production',
      user:     'famous_gigs_admin',
      password:  FG_PG_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory:'./migrations',
      tableName: 'knex_migrations'
    }
  }

};
