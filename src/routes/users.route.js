const router = require('express').Router();
const controller = require('../controllers/users.controller');
const authenticate = require('../middleware/authenticate.js');


router.post('/users/login', controller.login);
router.get('/users/logout', authenticate.findByToken, controller.logout);

router.route('/users')
  .get(controller.read)
  .post(controller.create)
  .put(controller.update)

router.route('/users/:id')
  .get(controller.readOne)
  .delete(controller.delete)

module.exports = router;