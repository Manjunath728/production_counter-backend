const { Pool }=require("pg");
const {
  DbUsername,
  DbPassword,
  database,
  DbUrl,
  Dbport
} = require('../config');
const pool=new Pool({
  user: DbUsername,
  host: DbUrl,
  database,
  password: DbPassword,
  port: Dbport,
});


module.exports={
  query:(text,params)=>pool.query(text,params),
};
