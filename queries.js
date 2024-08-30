const {Pool} = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_DB
});

pool.connect(err => {
    if (err) {
        console.error('Connecion Error', err.stack);
    }else {
        console.log('Database Connected');
    }
});