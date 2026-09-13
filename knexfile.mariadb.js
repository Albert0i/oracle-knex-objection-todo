/**
 * knexfile.js
 */
import 'dotenv/config'; 

export default {
  /**
   * Development
   */
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations',
      stub: './stubs/migration.stub'
    },
    seeds: {
      directory: './seeds',
      stub: './stubs/seed.stub'
    },
    debug: false,              // log SQL queries to console
    asyncStackTraces: false,   // show full async stack traces on errors
    fetchAsString: [ 'DATE', 'NUMBER' ], // return DATE/NUMBER columns as strings
  },
  /**
   * Production
   */
  production: {
    client: 'mysql2',
    connection: {
      host: process.env.PRODUCTION_DB_HOST,
      port: process.env.PRODUCTION_DB_PORT,
      user: process.env.PRODUCTION_DB_USER,
      password: process.env.PRODUCTION_DB_PASSWORD,
      database: process.env.PRODUCTION_DB_DATABASE
    },
    pool: { min: 2, max: 10 }
  }
};

/**
 * Knex.js Installation
 * https://knexjs.org/guide/
 */