var DbConfig = {
  development: {
    client: 'pg',
    connection: {
      host     : '127.0.0.1',
      port: 5432,
      user     : 'famous_gigs_admin',
      password : 'famous_gig_dev',
      database : 'famous_gigs_development',
      charset  : 'utf8'
    }
  },
  staging: {},
  production: {}
};

module.exports = DbConfig;
