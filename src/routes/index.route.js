const router = require('express').Router();
const controller = require('../controllers/index.controller');
const logger = require('../config/lib/log4js');

router.route('/mean-stack')
  .get(controller.read)
  .post(controller.create)

router.route('/mean-stack/:id')
  .get(controller.readOne)
  .delete(controller.delete)


module.exports = router;