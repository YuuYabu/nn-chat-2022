"use strict";
const http = require("http");
const auth = require("http-auth");
const router = require("./lib/router");

const basic = auth.basic({
  realm: 'Enter username and password.',
  file: './users.htpasswd'
});

const server = http.createServer(basic.check((req, res) => {
  router.route(req, res);
}))
  .on("error", e => {
    console.error("Server error", e);
  })
  .on("clientError", e => {
    console.error("Client error", e);
  });

  const port = process.env.PORT || 8000;
  server.listen(port, () => {
    console.info(`Listening on ${port}`);
  });