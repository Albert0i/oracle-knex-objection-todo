/**
 * knexfile.js
 */
import 'dotenv/config'; 

export default {
  /**
   * Development
   */
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: process.env.DB_FILENAME,
      options: {
        useNullAsDefault: true
      }
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
    client: 'better-sqlite3',
    connection: {
      filename: process.env.PRODUCTION_DB_FILENAME,
      options: {
        useNullAsDefault: true
      }
    },
    pool: { min: 2, max: 10 }
  }
};

/**
 * Knex.js Installation
 * https://knexjs.org/guide/
 * 
 * sqlite does not support inserting default values. 
 * Set the `useNullAsDefault` flag to hide this warning. 
 * (see docs https://knexjs.org/guide/query-builder.html#insert).
 */