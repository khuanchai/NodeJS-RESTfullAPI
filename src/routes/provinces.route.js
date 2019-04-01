const router = require('express').Router();
const logger = require('../config/lib/log4js');
const controller = require('../controllers/provinces.controller');

router.route('/provinces')
  .get(controller.find)
  .post(controller.create)


router.route('/provinces/:id')
  .get(controller.findById)
  .put(controller.update)
  .delete(controller.delete)

router.post('/provinces/query', controller.findfilter);


module.exports = router;