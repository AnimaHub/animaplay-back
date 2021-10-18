require("dotenv").config(); // this is important!

module.exports = {
  development: {
    username: "root",
    password: null,
    database: "animaflix",
    host: "localhost",
    dialect: "mysql",
    logging: console.log
  },
  test: {
    username: "root",
    password: null,
    database: "animaflix",
    host: "localhost",
    dialect: "mysql",
    logging: false
  },
  production: {
    username: "root",
    password: null,
    database: "animaflix",
    host: "localhost",
    dialect: "mysql",
    logging: false
  }
};
