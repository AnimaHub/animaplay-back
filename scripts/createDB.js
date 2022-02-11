const mysql = require("mysql2/promise");
var config = require("../config/database");

const dbConnection = config[process.env.NODE_ENV];

mysql
  .createConnection({
    host: dbConnection.host,
    port: 3306,
    user: dbConnection.username,
    password: dbConnection.password,
  })
  .then((connection) => {
    connection
      .query(`CREATE DATABASE IF NOT EXISTS ${dbConnection.database};`)
      .then((res) => {
        console.info("Database create or successfully checked");
        process.exit(0);
      });
  });
