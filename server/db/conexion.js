const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
   connectionString: process.env.DATABASE_URL,
   ssl: {rejectUnauthorized: false}
});

pool.connect()
 .then(() => console.log('Conectado a POSTGRE SQL'))
 .catch(err => console.error('Error al conectar a Postgre SQL:', err))

module.exports = pool;