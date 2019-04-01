const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId
const _ = require('lodash');
process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';
var config = require('config');

mongoose.connect('mongodb://10.138.47.134:27017/dt-test?replicaSet=rs_ct', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.set('debug', true);

require('../models/provinces.model');
const Provinces = mongoose.model('Provinces');



try {
    Provinces.find({ PROVINCE_NAME: 'XXXXX' }).select('PROVINCE_NAME -_id')
        .then(res => {
            if (res.length == 0) {
                console.log("data not found");
                return false;
            }
            console.log(res);
        }).catch(err => {
            console.log(err.message);
        });

} catch (ex) {
    console.log(ex.message);
}

// let error = new Error('Data Not Found');
// console.log(error.message);