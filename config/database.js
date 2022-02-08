require("dotenv").config(); // this is important!

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_URL,
    dialect: "mysql",
    logging: console.log,
  },
  test: {
    username: "root",
    password: null,
    database: "animaplay",
    host: "localhost",
    dialect: "mysql",
    logging: false,
  },
  production: {
    username: "root",
    password: null,
    database: "animaplay",
    host: "localhost",
    dialect: "mysql",
    logging: false,
  },
};
