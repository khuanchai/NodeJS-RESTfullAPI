const config = require('./config');
const logger = require('./lib/log4js');
const mongoose = require('./lib/mongoose');
const app = require('./lib/express');
const chalk = require('chalk');


exports.start = () => {
    app.listen(config.port, () => {
        logger.debug('Server start port :' + config.port)
    });
}
