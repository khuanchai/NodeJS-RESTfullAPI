
module.exports = (app) => {
    var user = require('../controllers/user.controller');

    app.route('/api/v1/users')
        .get(user.read)
        .post(user.create);

    app.route('/api/v1/users/:id')
        .get(user.readOne)
        .put(user.update)
        .delete(user.delete);

    // app.param('id', user.paramOne);
}



