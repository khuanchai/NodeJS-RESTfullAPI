let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: null
    },
    created: {
        type: Date,
        default: Date.now()
    }
}, { collection: 'productCategory' });

mongoose.model('ProductCategory', productCategorySchema);
