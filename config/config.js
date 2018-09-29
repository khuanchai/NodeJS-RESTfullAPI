const logger = require('./lib/log4js');
const env = process.env.ENV || 'development';
let fileENV = './env/' + env;
logger.debug(fileENV);
const config = require(fileENV);

module.exports = config;