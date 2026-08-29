/**
 * knexfile.js
 */
import 'dotenv/config'; 

export default {
  /**
   * Development
   */
  development: {
    client: 'oracledb',
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECTION_STRING
    },
    migrations: {
      directory: './migrations',
      tableName: '__knex_migrations',
      stub: './stubs/migration.stub'
    },
    seeds: {
      directory: './seeds',
      stub: './stubs/seed.stub'
    }
  },
  /**
   * Production
   */
  production: {
    client: 'oracledb',
    connection: {
      user: process.env.PRODUCTION_DB_USER,
      password: process.env.PRODUCTION_DB_PASSWORD,
      connectString: process.env.PRODUCTION_DB_CONNECTION_STRING
    },
    pool: { min: 2, max: 10 }
  }
};
