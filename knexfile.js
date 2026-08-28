/**
 * knexfile.js
 */
import 'dotenv/config'; 

export default {
  development: {
    client: 'oracledb',
    connection: {
      user: process.env.ORACLE_USERNAME,
      password: process.env.ORACLE_PASSWORD,
      connectString: process.env.ORACLE_CONNECTION_STRING
    },
    pool: { min: 2, max: 10 },   // merged from ./src version
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};
