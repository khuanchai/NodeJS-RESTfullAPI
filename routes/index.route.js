const val = require('../controllers/index.controller');
const logger = require('../config/lib/log4js');

module.exports = (app) => {
    app.get('/', val.index);
}