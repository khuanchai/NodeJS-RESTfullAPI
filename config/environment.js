const logger = require('./lib/log4js');
const env = process.env.NODE_ENV || 'development';
process.env.NODE_ENV = env;
logger.debug(process.env.NODE_ENV);
