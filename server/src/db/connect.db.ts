import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
import config from '../config/config.ts';

const { Pool } = pkg;
const pool = new Pool({
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    database: config.DATABASE_NAME,
    user: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    connectionString: config.DATABASE_URL,
});
const db = drizzle({ client: pool });

export default db;
export { pool };