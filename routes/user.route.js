const prefix = require('config').get('prefix');

module.exports = (app) => {
    var user = require('../controllers/user.controller');

    app.route(prefix + '/users')
        .get(user.read)
        .post(user.create);

    app.route(prefix + '/users/:id')
        .get(user.readOne)
        .put(user.update)
        .delete(user.delete);

    // app.param('id', user.paramOne);
}



