
module.exports = (app) => {

    const userCategory = require('../controllers/userCategory.controller');

    app.route('/api/v1/categorys/users')
        .get(userCategory.read)
        .post(userCategory.create)


    app.route('/api/v1/categorys/users/:id')
        .get(userCategory.readOne)
        .put(userCategory.update)
        .delete(userCategory.delete)

    app.param('id', userCategory.paramOne);
}

