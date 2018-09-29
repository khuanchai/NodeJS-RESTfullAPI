const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    created: {
        type: Date,
        default: Date.now()
    }
}, { collection: 'userCategory' });

mongoose.model('UserCategory', UserCategorySchema);
