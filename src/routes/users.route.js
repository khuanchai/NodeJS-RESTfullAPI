const router = require('express').Router();
const controller = require('../controllers/users.controller');
const authenticate = require('../middleware/authenticate.js');

router.post('/users/registering', controller.registering);
router.post('/users/authenticate', controller.login);
router.delete('/users/logout', authenticate.findByToken, controller.logout);


module.exports = router;