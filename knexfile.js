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
    // overly simplified snake_case -> camelCase converter
    // postProcessResponse: (result, queryContext) => {
    //   // TODO: add special case for raw results
    //   // (depends on dialect)
    //   if (Array.isArray(result)) {
    //     return result.map((row) => convertToCamel(row));
    //   } else {
    //     return convertToCamel(result);
    //   }
    // },
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

// Convert snake_case or SNAKE_CASE keys to camelCase
function convertToCamel(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  return Object.entries(obj).reduce((acc, [key, value]) => {
    // Lowercase the whole key first, then convert
    const camelKey = key
      .toLowerCase()
      .replace(/_([a-z])/g, (_, c) => c.toUpperCase());

    acc[camelKey] = value;
    return acc;
  }, {});
}

/**
 * Knex.js Installation
 * https://knexjs.org/guide/
 */