const Users = require('mongoose').model('Users');
const logger = require('../config/lib/log4js');
const lodash = require('lodash');
const validates = require('../validates/users.validate');
const chalk = require('chalk');
const service = require('../services/mongodb/users.service');

const Responsive = {
  success: false,
  data: null,
}

exports.create = (req, res) => {
  let resFront = Object.assign({}, Responsive);
  let payload = lodash.pick(req.body, ['firstname', 'lastname', 'username', 'password']);
  let testCaseName = 'USERS-CREATE';

  try {

    // validates
    let error = validates.registering(payload);
    if (error) {
      resFront.error = error;
      logger.debug(chalk.yellow('Validate invalid'));
      return res.status(400).send(resFront);
    }

    // call service
    service.registering(testCaseName, payload).then(resMongo => {
      resFront.data = resMongo;
      resFront.success = true;
      res.header('x-auth', resMongo.token).send(resFront);
    }).catch(err => {
      resFront.error = err.message;
      return res.status(400).send(resFront);
    });

  } catch (err) {
    resFront.error = err.message;
    return res.status(400).send(resFront);
  }
}

exports.login = (req, res) => {
  let payload = lodash.pick(req.body, ['username', 'password']);
  let resFront = Object.assign({}, Responsive);
  let testCaseName = 'USERS-LOGIN';
  try {

    // validates
    let error = validates.login(payload);
    if (error) {
      resFront.error = error;
      return res.status(400).send(resFront);
    }

    // call service
    service.login(testCaseName, payload).then(resMongo => {
      resFront.success = true;
      resFront.data = resMongo;
      return res.send(resFront);
    }).catch(err => {
      resFront.error = err.message;
      return res.status(400).send(resFront);
    });

  } catch (err) {
    resFront.error = err.message;
    return res.status(400).send(resFront);
  }
}

exports.logout = (req, res) => {
  let token = req.token;
  let user = req.user;
  let payload = { token, user };
  let testCaseName = 'USERS-LOGOUT';
  let resFront = Object.assign({}, Responsive);

  try {

    service.logout(testCaseName, payload).then(resMongo => {
      resFront.success = true;
      resFront.data = resMongo;
      res.send(resFront);
    }).catch(err => {
      resFront.error = err.message;
      return res.status(400).send(resFront);
    });

  } catch (error) {
    resFront.error = err.message;
    return res.status(400).send(resFront);
  }
}


exports.read = (req, res) => {
  let payload = {};
  let resFront = Object.assign({}, Responsive);
  let testCaseName = 'USERS-LIST';
  try {

    service.read(testCaseName, payload).then(resMongo => {
      resFront.success = true;
      resFront.data = resMongo;
      res.send(resFront);
    }).catch(err => {
      resFront.error = err.message;
      return res.status(400).send(resFront);
    });

  } catch (error) {
    resFront.error = err.message;
    return res.status(400).send(resFront);
  }
}

exports.readOne = (req, res) => {
  let id = req.params.id;
  let resFront = Object.assign({},Responsive);
  let testCaseName = 'USERS-LIST-ONE';
  try {

    service.readOne(testCaseName, id).then(resMongo => {
      resFront.success = true;
      resFront.data = resMongo;
      res.send(resFront);
    }).catch(err => {
      resFront.error = err.message;
      return res.status(400).send(resFront);
    });

  } catch (error) {
    resFront.error = err.message;
    return res.status(400).send(resFront);
  }
}

exports.update = (req, res) => {
  let payload = lodash.pick(req.body, ['_id', 'firstname', 'lastname', 'username', 'password']);
  let resFront = Object.assign({},Responsive);
  let testCaseName = 'USERS-UPDATE';
  try {

    // validates
    if (validates.validateObjectId(payload._id)) {
      resFront.error = validates.validateObjectId(payload._id)
      return res.status(400).send(resFront);
    }

    service.update(testCaseName, payload).then(resMongo => {
      resFront.success = true;
      resFront.data = resMongo;
      res.send(resFront);
    }).catch(err => {
      resFront.error = err.message;
      return res.status(400).send(resFront);
    });

  } catch (error) {
    resFront.error = err.message;
    return res.status(400).send(resFront);
  }
}

exports.delete = (req, res) => {
  let id = req.params.id;
  let resFront = Object.assign({},Responsive);
  let testCaseName = 'USERS-DELETE';
  try {

    // validates
    let error = validates.validateObjectId(id);
    if (error) {
      resFront.error = error;
      return res.status(400).send(resFront);
    }

    // call service delete
    service.delete(testCaseName, id).then(resMongo => {
      resFront.success = true;
      resFront.data = resMongo;
      res.send(resFront);
    }).catch(err => {
      resFront.error = err.message;
      return res.status(400).send(resFront);
    });

  } catch (err) {
    resFront.error = err.message;
    return res.status(400).send(resFront);
  }
}
