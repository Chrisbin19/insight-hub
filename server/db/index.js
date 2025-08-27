import { Pool } from 'pg'
 
const pool = new Pool(
    {
  user: 'postgres',
  password: 'Chrisbin@19',
  host: 'localhost',
  port: 5432,
  database: 'yelp',
}
);
 
export const query = (text, params) => pool.query(text, params)