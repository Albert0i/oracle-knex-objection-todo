/**
 * testConn.js
 */
import db from './db.js';

async function testConnection() {
  try {
    // Run a simple query to confirm MariaDB connectivity
    // VERSION() returns the exact string version of your MariaDB engine
    const result = await db.raw('SELECT VERSION() AS mariadb_version');
    
    // In Knex with the mysql2 driver, data rows populate the first index array element
    const version = result[0][0].mariadb_version;
    console.log(`✅ Connection OK! MariaDB Server version: ${version}`);

  } catch (err) {
    console.error('❌ Connection failed:', err);
  } finally {
    // Always close the pool
    await db.destroy();
  }
}

testConnection();
