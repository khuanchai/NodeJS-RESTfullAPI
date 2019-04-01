const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId
const _ = require('lodash');
process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';
var config = require('config');

mongoose.connect('mongodb://10.138.47.134:27017/dt-test?replicaSet=rs_ct', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.set('debug', true);

var ENV = process.env.NODE_ENV;
console.log(ENV);
// var dbConfig = config.get('Customer.dbConfig');
// console.log(dbConfig);

