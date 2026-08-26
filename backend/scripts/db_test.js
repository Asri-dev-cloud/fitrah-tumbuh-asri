/**
 * File: scripts/db_test.js
 * Deskripsi: Script uji coba koneksi PostgreSQL dan pengubahan zona waktu database menjadi Asia/Jakarta (WIB).
 */

import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL
});

try {
  await client.connect();
  console.log('Connected!');
  
  // Set database timezone to Asia/Jakarta (WIB)
  await client.query("ALTER DATABASE postgres SET timezone TO 'Asia/Jakarta';");
  await client.query("ALTER ROLE postgres SET timezone TO 'Asia/Jakarta';");
  console.log('Timezone altered for database and role!');
  
  const res = await client.query('SELECT NOW()::text');
  console.log('Current time after timezone alter (text):', res.rows[0]);

  await client.end();
} catch (err) {
  console.error('Error details:', err);
}
