const config = require('../config');
const logger = require('./log4js');
const mongoose = require('mongoose');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

let { uris, options, debug } = config.db;

mongoose.set('debug', debug);
mongoose.Promise = global.Promise;
mongoose.connect(uris, options, (err) => {
    if (err) {
        console.log(chalk.red(err));
    } else {
        logger.debug(chalk.green('Connect Success'));

    }
});

// load Models
let pathModels = path.resolve(__dirname, '../../models');
// logger.debug(pathModels);
let files = fs.readdirSync(pathModels, { encoding: 'utf8' });
files.forEach(file => {
    let model = `${pathModels}\\${file}`;
    require(model);
});

module.exports = mongoose;
