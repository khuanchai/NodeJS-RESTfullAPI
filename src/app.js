const config = require('./config/config');
const log4js = require('./config/lib/log4js');
const mongoose = require('./config/lib/mongoose');
const express = require('./config/lib/express');
const chalk = require('chalk');

// STEP 1: connect mongodb
mongoose.connection().then(res => {
  // STEP 2: load models
  mongoose.loadModels();
  // STEP 3: config express
  const app = express.initMiddleware();
  // STEP 4: load route
  express.loadRoutes(app);
  // STEP 5: star server
  express.starServer(app);
}).catch(err => {
  log4js.debug(err);
  mongoose.closeConnect();
});




