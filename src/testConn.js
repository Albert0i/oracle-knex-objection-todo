/**
 * testConn.js
 */
import db from './db.js';

async function testConnection() {
  try {
    // Run a simple query to confirm Oracle connectivity
    const result = await db.raw('SELECT banner FROM v$version WHERE ROWNUM = 1');
    console.log('✅ Connection OK:', result);

  } catch (err) {
    console.error('❌ Connection failed:', err);
  } finally {
    // Always close the pool
    await db.destroy();
  }
}

testConnection();
