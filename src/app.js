const express = require('express');
const bodyParser = require('body-parser');
const ip = require('ip');

const { runNode } = require('./utils');

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

const [port, mode, isMiner, ...rest] = process.argv.slice(2);

runNode(mode, isMiner, ...rest);

app.listen(port || 8080, () => {
  console.log(`Running on ${port || 8080}`);
  console.log(`ip:${ip.address()}`);
});
