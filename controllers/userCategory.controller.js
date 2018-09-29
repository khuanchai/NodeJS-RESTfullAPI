const UserCategory = require('mongoose').model('UserCategory');
const logger = require('../config/lib/log4js');
const _ = require('lodash');

exports.read = function (req, res) {
    logger.debug('--- controller ---');
    UserCategory.find({}).then(users => {
        res.send({ success: true, users });
    }).catch(err => {
        res.status(400).send({ success: false, err });
    });
}

exports.paramOne = function (req, res, next, id) {
    console.log('test');
    UserCategory.findOne({ _id: id }, (err, user) => {
        if (!err) {
            req.userCate = user;
        }
        next();
    });
    // UserCategory.findById({ _id: id }).then(user => {
    //     req.userCate = user;
    //     next();
    // }).catch(err => next());
}

exports.readOne = function (req, res) {
    res.send(req.userCate);
}

exports.create = function (req, res) {
    return new Promise((resolve, reject) => {
        UserCategory.create(req.body, (err, user) => {
            if (err) {
                reject(res.json({ success: false, err }));
            }
            resolve(res.json({ success: true, user }));
        });

    });

}

exports.update = function (req, res) {
    return new Promise((resolve, reject) => {
        let data = req.body;
        let id = req.params.id;
        _.unset(data, "_id");
        UserCategory.findByIdAndUpdate({ _id: id }, data, { new: true }, (err, user) => {
            if (err) {
                reject(res.json({ success: false, err }));
            }
            resolve(res.json({ success: true, user }));
        })
    });
}

exports.delete = function (req, res) {
    return new Promise((resolve, reject) => {
        req.userCate.remove(function (err, user) {
            if (err) {
                reject(res.json({ success: false, err }));
            }
            resolve(res.json({ success: true, user }));
        });
    });
}