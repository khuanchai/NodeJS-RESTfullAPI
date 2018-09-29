var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    salt: {     // ใช้ทำ password hash
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'UserCategory'
    },
    created: {
        type: Date,
        default: Date.now()
    }

}, { collection: 'user' });


mongoose.model('User', UserSchema);
