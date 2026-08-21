import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL
});

console.log('Connecting to:', process.env.DATABASE_URL);

try {
  await client.connect();
  console.log('Connected!');
  const res = await client.query('SELECT NOW()');
  console.log('Query result:', res.rows[0]);
  await client.end();
} catch (err) {
  console.error('Error details:', err);
}
