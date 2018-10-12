const prefix = require('config').get('prefix');

module.exports = (app) => {

    const userCategory = require('../controllers/userCategory.controller');

    app.route(prefix + '/categorys/users')
        .get(userCategory.read)
        .post(userCategory.create)


    app.route(prefix + '/categorys/users/:id')
        .get(userCategory.readOne)
        .put(userCategory.update)
        .delete(userCategory.delete)

    app.param('id', userCategory.paramOne);
}

