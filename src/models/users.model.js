const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { jwtPrivateKey } = require('../config/config.js');
const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    maxlength: 255,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 255,
    trim: true
  },
  username: {
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
  status: {
    type: String,
    enum: ['user','admin'],
    default: 'user'
  },
  tokens: {
    type: Array
  }
}, { collection: 'users' });

UserSchema.methods.generateAuthToken = function () {
  let user = this;
  let token = jwt.sign({ _id: user._id }, jwtPrivateKey);
  user.tokens.push(token);
  console.log(user);
  return user.save().then(() => {
    return { user, token };
  });
}

UserSchema.statics.findByToken = function (token) {
  let Users = this;
  try {
    let decoded = jwt.verify(token, jwtPrivateKey);
    console.log(decoded);
    return Users.findById({ '_id': decoded._id, });

  } catch (err) {
    return Promise.reject(err);
  }

}


module.exports = mongoose.model('Users', UserSchema);