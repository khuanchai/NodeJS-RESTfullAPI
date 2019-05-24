const config = require('../config');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

exports.mockupMongoDB = (testCaseName) => {
  let pathMockup = path.resolve(__dirname, '../../mockup/mongodb/' + testCaseName + '.json');
  let options = 'utf8'
  let jsonMonup = JSON.parse(fs.readFileSync(pathMockup, options));
  return jsonMonup;
}

const mockupOracle = (testCaseName) => {
  let pathMockup = path.resolve(__dirname, '../../mockup/oracle/' + testCaseName + '.json');
  let options = 'utf8'
  let jsonMonup = JSON.parse(fs.readFileSync(pathMockup, options));
  return jsonMonup;
}

exports.requestOracleAPI = (testCaseName = '', method = '', url = '', payLoad = null) => {
  return new Promise((resolve, reject) => {

    // MOCKUP
    if (config.tdd) {
      return resolve({ data: mockupOracle(testCaseName) });
    }

    // REQUEST API
    method = method.toUpperCase();
    switch (method) {
      case 'GET':
        resolve(axios.get(url));
        break;
      case 'POST':
        resolve(axios.post(url, payLoad));
        break;
      case 'PUT':
        resolve(axios.put(url, payLoad));
        break;
      case 'DELETE':
        resolve(axios.delete(url));
        break;
      default:
        reject(new Error('not found method'));
    }
  });

}

