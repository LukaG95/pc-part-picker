const express = require('express');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const xss = require('xss-clean');

const app = express();

app.use(helmet());
app.use(compression());
app.use(xss());
app.use(express.static(path.join(__dirname, '../client/build')));

module.exports = app;