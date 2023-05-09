import { Pool } from "pg";

export const pool = new Pool({
  user: 'admin',
  host: 'svc.sel3.cloudtype.app',
  database: 'trip_genie',
  password: 'admin',
  port: 30641,
});