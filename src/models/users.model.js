const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { jwtPrivateKey } = require('../config/config.js');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        maxlength: 255,
        trim: true
    },
    password: {
        type: String,
        required: true,
        maxlength: 255,
        trim: true
    },
    tokens: {
        type: Array
    }
}, { collection: 'users' });

UserSchema.methods.generateAuthToken = function () {
    let user = this;
    let token = jwt.sign({ _id: user._id }, jwtPrivateKey);
    user.tokens.push(token);
    return user.save().then(() => {
        return { user, token };
    });
}

UserSchema.statics.findByToken = function (token) {
    let Users = this;
    try {
        let decoded = jwt.verify(token, jwtPrivateKey);
        return Users.findById({ '_id': decoded._id, });

    } catch (err) {
        return Promise.reject(err);
    }

}

mongoose.model('Users', UserSchema);
