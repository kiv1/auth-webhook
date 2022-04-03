require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database:'auth_database',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
})

module.exports = pool