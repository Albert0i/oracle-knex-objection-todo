/**
 * testConn.js
 */
import db from './db.js';

async function testConnection() {
  try {
    // 1. Run a generic core runtime metadata query for SQLite
    // sqlite_version() is the standard built-in function to query engine parameters
    const result = await db.raw('SELECT sqlite_version() AS sqlite_version');
    
    // 2. Extract data payload properties safely
    // Unlike mysql2, better-sqlite3 returns a clean, flat Array of Objects immediately
    const version = result[0].sqlite_version;
    console.log(`✅ Connection OK! SQLite Server version: ${version}`);

  } catch (err) {
    console.error('❌ Connection failed:', err);
  } finally {
    // Always close the pool
    await db.destroy();
  }
}

testConnection();
