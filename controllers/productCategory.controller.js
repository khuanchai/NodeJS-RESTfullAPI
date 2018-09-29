let ProductCategory = require('mongoose').model('ProductCategory');

exports.create = function (req, res) {
    return new Promise((resolve, reject) => {
        let productCategory = new ProductCategory(req.body);
        productCategory.save((err, data) => {
            if (err) reject(res.json({ success: false, error: err }));
            resolve(res.json({ success: true, data: data }));
        });
    });
}

exports.read = function (req, res) {
    return new Promise((resolve, reject) => {
        ProductCategory.find({}, (err, data) => {
            if (err) reject(res.json({ success: false, error: err }));
            resolve(res.json({ success: true, data: data }));
        });
    });
}

exports.readOne = function (req, res) {
    res.json(req.productCate);
}

exports.paramOne = function (req, res, next, id) {
    ProductCategory.findById({ _id: id }, (err, data) => {
        if (!err) {
            req.productCate = data;
        }
        next();
    });
}

exports.update = function (req, res) {
    return new Promise((resolve, reject) => {
        ProductCategory.updateOne({ _id: req.productCate._id }, req.body, (err, data) => {
            if (err) {
                reject(res.json({ success: false, error: err }));
            }
            resolve(res.json({ success: true, data }));
        })
    });
}

exports.delete = function (req, res) {
    return new Promise((resolve, reject) => {
        req.productCate.remove((err, data) => {
            if (err) reject(res.json({ success: false, error: err }));
            resolve(res.json({ success: true, data: data }));
        });
    });
}

