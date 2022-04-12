import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const host = process.env.PG_HOST || "localhost";
const user = process.env.PG_USER || "postgres";
const password = process.env.PG_PWD || "12345";
const database = process.env.PG_DATABASE || "postgres";
const port: any = process.env.PG_PORT || 5432;

const pool = new Pool({
  host,
  user,
  password,
  database,
  port,
});

const rows = async (SQL: string, ...params: any) => {
  const client = await pool.connect();

  try {
    const { rows } = await client.query(SQL, params);
    return rows;
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
};

const row = async (SQL: string, ...params: any) => {
  const client = await pool.connect();

  try {
    const {
      rows: [row],
    } = await client.query(SQL, params);
    return row;
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
};

export { rows, row };
