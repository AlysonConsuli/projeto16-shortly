import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
const { Pool } = pg

const user = 'postgres';
const password = process.env.DATABASE_PASSWORD;
const host = 'localhost';
const port = 5432;
const database = process.env.DATABASE_URL;

const db = new Pool({
    user,
    password,
    host,
    port,
    database
})

export default db