const env = process.env.ENV || 'development';
const config = require('./env/' + env);
module.exports = config;