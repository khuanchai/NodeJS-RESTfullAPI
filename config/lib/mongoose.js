const config = require('../config');
const mongoose = require('mongoose');
const chalk = require('chalk');

let { uris, options, debug } = config.db;

mongoose.set('debug', debug);
mongoose.Promise = global.Promise;
mongoose.connect(uris, options, (err) => {
    if (err) {
        console.log(chalk.blue(err));
    } else {
        console.log(chalk.green('Connect Success'));
    
    }
});

// load Models


module.exports = mongoose;
