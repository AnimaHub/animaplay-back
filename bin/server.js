"use strict";

const http = require("http");
const app = require("../src/app");
const debug = require("debug")("nodestr:server");

const normalizePort = (selected_port) => {
  const port = parseInt(selected_port, 10);
  if (isNaN(port)) {
    return selected_port;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe" + port : "Port" + port;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe" + addr : "port " + addr.port;
  debug(`Listening on ${bind}`);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
console.log(`API running on port ${port}`);