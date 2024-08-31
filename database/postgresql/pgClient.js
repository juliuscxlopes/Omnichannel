// database/postgresql/pgClient.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Necessário para algumas configurações de SSL no Railway
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
