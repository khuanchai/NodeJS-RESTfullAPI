const mongoose = require('mongoose');

// {
//     "_id" : ObjectId("59e87499c48395288f590e48"),
//     "ROW_ID" : "3",
//     "PROVINCE_ROWID" : "5",
//     "PROVINCE_ID" : "AYA",
//     "PROVINCE_NAME" : "พระนครศรีอยุธยา",
//     "PROVINCE_SUP_TYPE" : "THA",
//     "PROVINCE_USE_FLAG" : "Y",
//     "BUSINESS_TYPE" : "",
//     "REGION" : "C3",
//     "__v" : 0
// }

let schema = new mongoose.Schema({
    ROW_ID: {
        type: String,
        required: true,
        trim: true
    },
    PROVINCE_ROWID: {
        type: String,
        required: true,
        trim: true
    },
    PROVINCE_ID: {
        type: String,
        required: true,
        trim: true,
        maxlength: 3
    },
    PROVINCE_NAME: {
        type: String,
        required: true,
        trim: true
    },
    PROVINCE_SUP_TYPE: {
        type: String,
        required: true,
        trim: true,
        maxlength: 3
    },
    PROVINCE_USE_FLAG: {
        type: String,
        required: true,
        trim: true
    },
    BUSINESS_TYPE: {
        type: String,
        trim: true,
        maxlength: 1
    },
    REGION: {
        type: String,
        required: true,
        trim: true
    },
});

module.exports = mongoose.model('Provinces', schema);



