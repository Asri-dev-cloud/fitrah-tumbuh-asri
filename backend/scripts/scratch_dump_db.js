/**
 * File: scripts/scratch_dump_db.js
 * Deskripsi: Script penolong untuk mengekspor (dump) seluruh data tabel PostgreSQL ke file JSON lokal (db_dump.json).
 */

import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  try {
    const dump = {};
    const tables = ['programs', 'portfolio_items', 'store_items', 'orders', 'registrations', 'talent_participants'];
    for (const table of tables) {
      const res = await pool.query(`SELECT * FROM ${table}`);
      dump[table] = res.rows;
    }
    fs.writeFileSync('db_dump.json', JSON.stringify(dump, null, 2));
    console.log("Dump saved to db_dump.json");
  } catch (err) {
    console.error("Error dumping db:", err);
  } finally {
    await pool.end();
  }
}

main();
