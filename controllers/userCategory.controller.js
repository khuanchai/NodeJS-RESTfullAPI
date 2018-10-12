const UserCategory = require('mongoose').model('UserCategory');
const logger = require('../config/lib/log4js');
const _ = require('lodash');

exports.read = (req, res) => {
    UserCategory.find({}).then(users => {
        res.send({ success: true, users });
    }).catch(err => {
        res.status(400).send({ success: false, error: err.message });
    });
}

exports.paramOne = (req, res, next, id) => {
    UserCategory.findById({ _id: id }).then(user => {
        req.userCate = user;
        next();
    }).catch(err => next());
}

exports.readOne = (req, res) => {
    res.send(req.userCate);
}

exports.create = (req, res) => {
    let userCategory = new UserCategory(req.body);
    userCategory.save().then(() => {
        res.send({ success: true, user: userCategory });
    }).catch(err => {
        res.status(400).send({ success: false, err: error.message })
    });
}

exports.update = (req, res) => {
    let data = _.pick(req.body, ['name', 'description']);
    let id = req.params.id;
    UserCategory.findByIdAndUpdate({ _id: id }, { $set: data }, { new: true }, (err, user) => {
        if (err) return res.status(204).send({ success: true, user });
        res.status(400).send({ success: true, user });
    }).catch(err => {
        res.status(400).send({ success: false, err: error.message })
    });
}

exports.delete = function (req, res) {
    return new Promise((resolve, reject) => {
        req.userCate.remove(function (err, user) {
            if (err) {
                reject(res.send({ success: false, err }));
            }
            resolve(res.send({ success: true, user }));
        });
    });
}