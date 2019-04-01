const Users = require('mongoose').model('Users');
const ObjectId = require('mongoose').Types.ObjectId;
const _ = require('lodash');
const Joi = require('joi');

exports.registering = (req, res) => {
    let payload = _.pick(req.body, ['email', 'password']);

    // Validate Data
    let { error, value } = Validate(payload);
    if (error) return res.status(400).send(error.details[0].message);

    // Validate Email Uniq
    Users.findOne({ email: payload.email }).then(doc => {
        if (doc) return res.status(400).send('User already registered.');
        let user = new Users(payload);
        user.generateAuthToken().then(data => {
            res.header('x-auth', data.token).send(data.user);
        });
    }).catch(err => res.status(404).send(err));


}

exports.login = (req, res) => {
    let payload = _.pick(req.body, ['email', 'password']);
    console.log(payload);
    // Validate Data
    let { error, value } = Validate(payload);
    if (error) return res.status(400).send(error.details[0].message);

    // Validate Email
    Users.findOne({ email: payload.email }).then(user => {
        if (!user) return res.status(400).send('Email is invalid');
        if (payload.password != user.password) return res.status(400).send('Password is invalid');

        user.generateAuthToken().then(data => {
            res.header('x-auth', data.token).send(data.user);
        });

    });
}

exports.logout = (req, res) => {
    let token = req.token;
    let user = req.user;
    user.tokens.pull(token);
    user.save();
    res.send(user);
}

function Validate(payload) {
    let user = _.pick(payload, ['email', 'password']);
    let schema = {
        email: Joi.string().required().max(255).trim(),
        password: Joi.string().required().max(255).trim()
    };
    return Joi.validate(user, schema);
};