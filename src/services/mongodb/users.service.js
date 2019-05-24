const config = require('../../config/config');
const Users = require('mongoose').model('Users');
const logger = require('../../config/lib/log4js');
const requestUtils = require('../../config/utils/request.utils');
const bcrypt = require('bcryptjs');
const chalk = require('chalk');

exports.registering = (testCaseName, payload) => {
  return new Promise((resolve, reject) => {
    try {
      if (config.tdd) {
        resolve(requestUtils.mockupMongoDB(testCaseName));
      } else {
        // Validate Username Uniq
        logger.debug(JSON.stringify(payload));
        Users.findOne({ username: payload.username }).then(doc => {
          if (doc) {
            logger.debug(chalk.yellow('Username already registered.'));
            reject(new Error('Username already registered.'));
          }
          let user = new Users(payload);
          user.password = hasPassword(user.password);
          user.generateAuthToken().then(data => {
            if (data) {
              resolve(data);
            } else {
              logger.debug(chalk.yellow('save not found.'))
              reject(new Error('save not found.'));
            }
          });

        }).catch(err => {
          logger.debug(chalk.yellow('findOne Error'));
          reject(err);
        });
      }
    } catch (err) {
      logger.debug(chalk.yellow('catch Error'));
      reject(err);
    }
  });
}

exports.login = (testCaseName, payload) => {
  return new Promise((resolve, reject) => {
    try {
      if (config.tdd) {
        resolve(requestUtils.mockupMongoDB(testCaseName));
      } else {

        logger.debug(JSON.stringify(payload));
        Users.findOne({ username: payload.username }).then(doc => {
          console.log(doc);
          if (!doc) {
            logger.debug(chalk.yellow('Username not found.'));
            reject(new Error('Username not found.'));
          } else if (!bcrypt.compareSync(payload.password, doc.password)) {
            reject(new Error('Password is invalid'));
          } else {
            return doc.generateAuthToken();
          }
        }).then(data => {
          console.log(data);
          if (data) {
            resolve(data);
          } else {
            logger.debug(chalk.yellow('login not found.'))
            reject(new Error('login not found.'));
          }
        }).catch(err => {
          logger.debug(chalk.yellow('findOne Error'));
          reject(err);
        });
      }
    } catch (err) {
      logger.debug(chalk.yellow('catch Error'));
      reject(err);
    }
  });
}

exports.create = (testCaseName, payload) => {
  return new Promise((resolve, reject) => {
    try {
      if (config.tdd) {
        resolve(requestUtils.mockupMongoDB(testCaseName));
      } else {

      }
    } catch (err) {
      logger.debug(chalk.yellow('catch Error'));
      reject(err.message);
    }
  });
}

exports.read = (testCaseName, payload) => {
  return new Promise((resolve, reject) => {
    try {
      if (config.tdd) {
        resolve(requestUtils.mockupMongoDB(testCaseName));
      } else {
        Users.find(payload, { tokens: 0, __v: 0 }).then(doc => {
          if (doc) {
            resolve(doc);
          } else {
            logger.debug(chalk.yellow('data not found.'));
            reject(new Error('data not found.'));
          }
        }).catch(err => {
          logger.debug(chalk.yellow('find Error'));
          reject(err);
        });
      }
    } catch (err) {
      logger.debug(chalk.yellow('catch Error'));
      reject(err);
    }
  });
}

exports.readOne = (testCaseName, id) => {
  return new Promise((resolve, reject) => {
    try {
      if (config.tdd) {
        resolve(requestUtils.mockupMongoDB(testCaseName));
      } else {
        Users.findOne({ _id: id }, { tokens: 0, __v: 0 }).then(doc => {
          if (doc) {
            resolve(doc);
          } else {
            logger.debug(chalk.yellow('data not found.'));
            reject(new Error('data not found.'));
          }
        }).catch(err => {
          logger.debug(chalk.yellow('find Error'));
          reject(err);
        });
      }
    } catch (err) {
      logger.debug(chalk.yellow('catch Error'));
      reject(err);
    }
  });
}


exports.update = (testCaseName, payload) => {
  return new Promise((resolve, reject) => {
    try {
      if (config.tdd) {
        resolve(requestUtils.mockupMongoDB(testCaseName));
      } else {
        let { _id } = payload;
        delete payload._id;
        let update = payload;
        Users.findByIdAndUpdate(_id, update, { new: true }).then(doc => {
          if (doc) resolve(doc)
          reject(new Error('data not found.'))
        }).catch(err => {
          logger.debug(chalk.yellow('findByIdAndUpdate Error'));
          reject(err);
        });
      }
    } catch (err) {
      logger.debug(chalk.yellow('catch Error'));
      reject(err);
    }
  });
}

exports.delete = (testCaseName, id) => {
  return new Promise((resolve, reject) => {
    try {

      if (config.tdd) {
        resolve(requestUtils.mockupMongoDB(testCaseName));
      } else {
        Users.findOneAndRemove(id).then(doc => {
          if (doc) {
            resolve(doc);
          } else {
            logger.debug(chalk.yellow('findById not found.'));
            reject(new Error('findById not found.'));
          }
        }).catch(err => {
          logger.debug(chalk.yellow('findById Error'));
          reject(err);
        });
      }
    } catch (err) {
      logger.debug(chalk.yellow('catch Error'));
      reject(err);
    }
  });
}

exports.logout = (testCaseName, payload) => {
  return new Promise((resolve, reject) => {
    try {
      if (config.tdd) {
        resolve(requestUtils.mockupMongoDB(testCaseName));
      } else {
        let { user, token } = payload;
        user.tokens.pull(token);
        user.save((err, doc) => {
          if (err) {
            logger.debug(chalk.yellow('save not found.'));
            reject(new Error('save not found.'));
          }
          resolve(doc);
        });
      }
    } catch (err) {
      logger.debug(chalk.yellow('catch Error'));
      reject(err);
    }
  });
}


function hasPassword(password) {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  return hash;
}


