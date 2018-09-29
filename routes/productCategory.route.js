module.exports = (app) => {
    let productCategory = require('../controllers/productCategory.controller');

    app.route('/api/v1/categorys/products')
        .get(productCategory.read)
        .post(productCategory.create);

    app.route('/api/v1/categorys/products/:id')
        .get(productCategory.readOne)
        .put(productCategory.update)
        .delete(productCategory.delete);

    app.param('id', productCategory.paramOne);

}

