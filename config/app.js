const config = require('./config');
const mongoose = require('./lib/mongoose');
const app = require('./lib/express');
const logger = require('./lib/log4js');
const chalk = require('chalk');


exports.start = () => {
    app.listen(config.port, () => {
        logger.debug('Server start port :' + config.port)
    });
}
