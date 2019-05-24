const Joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;

exports.registering = (payload) => {
  let schema = {
    firstname: Joi.string().required().max(255).trim(),
    lastname: Joi.string().required().max(255).trim(),
    username: Joi.string().required().max(255).trim(),
    password: Joi.string().required().max(255).trim()
  };
  let error = Joi.validate(payload, schema).error;
  return formatError(error);
}

exports.update = (payload) => {
  let schema = {
    _id: Joi.string().required(),
  };
  let error = Joi.validate(payload, schema).error;
  return formatError(error);
}

exports.login = (payload) => {
  let schema = {
    username: Joi.string().required().max(255).trim(),
    password: Joi.string().required().max(255).trim()
  };
  let error = Joi.validate(payload, schema).error;
  return formatError(error);
}

exports.validateObjectId = (id) => {
  let error = null
  if (!ObjectId.isValid(id)) {
    error = 'ObjectId isValid.';
  }
  return error;
}


function formatError(error) {
  let err = null;
  if (error) {
    let key = error.details[0].context.key;
    let message = error.details[0].message.toString().replace(/"/g, '')
    err = { [key]: message };
  }
  return err;
}