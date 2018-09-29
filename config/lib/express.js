const config = require('../config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const path = require('path');
const logger = require('./log4js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// load Route
let pathRouts = path.resolve(__dirname, '../../routes');
// logger.debug(pathRouts);
let files = fs.readdirSync(pathRouts, { encoding: 'utf8' });
files.forEach(file => {
    let route = `${pathRouts}/${file}`;
    require(route)(app);
});

module.exports = app;