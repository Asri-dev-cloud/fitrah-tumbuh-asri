import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  try {
    console.log("Listing all tables in public schema...");
    const tablesRes = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    const tables = tablesRes.rows.map(r => r.table_name);
    console.log("Tables found:", tables);

    // Search for youtube/youtu/mv related values in all tables
    for (const table of tables) {
      const columnsRes = await pool.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = $1
      `, [table]);
      
      const textColumns = columnsRes.rows
        .filter(c => ['character varying', 'text', 'jsonb', 'character'].includes(c.data_type))
        .map(c => c.column_name);
      
      if (textColumns.length === 0) continue;

      for (const col of textColumns) {
        // Find rows containing youtube or youtu or mv (case insensitive)
        const queryStr = `
          SELECT * FROM "${table}" 
          WHERE CAST("${col}" AS TEXT) ILIKE '%youtube%' 
             OR CAST("${col}" AS TEXT) ILIKE '%youtu.be%'
             OR CAST("${col}" AS TEXT) ILIKE '%watch%'
             OR CAST("${col}" AS TEXT) ILIKE '%mv%'
        `;
        try {
          const searchRes = await pool.query(queryStr);
          if (searchRes.rows.length > 0) {
            console.log(`\nMatch found in table "${table}", column "${col}":`);
            console.log(JSON.stringify(searchRes.rows, null, 2));
          }
        } catch (e) {
          // ignore query errors for complex/custom types
        }
      }
    }
  } catch (err) {
    console.error("Error running search:", err);
  } finally {
    await pool.end();
  }
}

main();
