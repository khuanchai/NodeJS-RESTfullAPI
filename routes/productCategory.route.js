const prefix = require('config').get('prefix');

module.exports = (app) => {
    let productCategory = require('../controllers/productCategory.controller');

    app.route(prefix + '/categorys/products')
        .get(productCategory.read)
        .post(productCategory.create);

    app.route(prefix + '/categorys/products/:id')
        .get(productCategory.readOne)
        .put(productCategory.update)
        .delete(productCategory.delete);

    app.param('id', productCategory.paramOne);

}

