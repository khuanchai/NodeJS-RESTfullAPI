const mongoose = require('mongoose');

/* {
     "_id" : ObjectId("5b3063dee1ee287592763c9e"),
     "masterKey" : "paymentInstallment",
     "masterValue" : "NO",
     "value1" : "NO"
 }*/


const schema = mongoose.Schema({
    masterKey: String,
    masterValue: String,
    value1: String
}, { collection: 'test' });

module.exports = mongoose.model('Test', schema);

