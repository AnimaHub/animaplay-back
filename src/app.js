"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger_output.json");

const app = express();

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,x-access-token"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

//Load all routes
const users_route = require("./routes/users-routes");
const token_route = require("./routes/token-routes");
const laboratories_route = require("./routes/laboratories-routes");
const projects_route = require("./routes/projects-routes");
const events_route = require("./routes/events-routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/users", users_route);
app.use("/laboratories", laboratories_route);
app.use("/projects", projects_route);
app.use("/events", events_route);
app.use("/token", token_route);

app.use("/assets", express.static("assets"));

// Swagger
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;
