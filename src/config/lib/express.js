const config = require('../config');
const logger = require('./log4js');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const app = express();
const isEmpty = require('lodash').isEmpty;
const multer = require('multer');
const passport = require('passport');
const session = require('express-session')

exports.initMiddleware = () => {
  app.use(bodyParser.json());     // req.body
  app.use(bodyParser.urlencoded({ extended: true }));  // ?name=xxx&age=xxx
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(morgan('tiny'));
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
  app.use(passport.initialize());
  app.use(passport.session());
  require('../lib/passport.js').jwtStrategy(passport);
  return app;
}

exports.loadRoutes = (app) => {
  let pathRouts = path.resolve(__dirname, '../../routes');
  let files = fs.readdirSync(pathRouts, { encoding: 'utf8' });
  files.forEach(file => {
    let route = `${pathRouts}/${file}`;
    let router = require(route);
    if (!isEmpty(router)) {
      app.use(config.prefix, router);
    }
  });
  app.use((req, res, next) => {
    res.status(404).send({ error: "Sorry, page not found" });
  });
}

exports.starServer = (app) => {
  app.listen(config.port, () => {
    logger.debug(chalk.green('Server start port :' + config.port));
  });
}



