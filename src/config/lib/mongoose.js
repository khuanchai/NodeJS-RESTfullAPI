const config = require('../config');
const logger = require('./log4js');
const mongoose = require('mongoose');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

exports.connection = () => {
  return new Promise((resolve, reject) => {
    let { uris, options, debug } = config.db;
    mongoose.set('debug', debug);
    mongoose.Promise = global.Promise;

    mongoose.connect(uris, options)
      .then(() => resolve('Connect Success'))
      .catch(err => reject(err));
  });
};

exports.closeConnect = () => {
  mongoose.connection.close();
}

exports.loadModels = () => {
  let pathModels = path.resolve(__dirname, '../../models');
  let models = fs.readdirSync(pathModels);
  models.forEach(model => {
    let pathModel = `${pathModels}\\${model}`;
    require(pathModel);
  });
}


