const Provinces = require('mongoose').model('Provinces');
const logger = require('../config/lib/log4js');
const chalk = require('chalk');
const Joi = require('joi');
const ObjectId = require('mongoose').ObjectId;


exports.find = (req, res) => {
    try {
        logger.debug('--- find ---');
        Provinces.find({}).then(data => {
            if (data.length == 0) return res.status(204).send("Data Not Found");
            res.send({ success: true, count: data.length, data });
        }).catch(err => {
            res.status(400).send(err.message);
        });

    } catch (ex) {
        res.status(400).send(ex.message);
    }

}

exports.findById = (req, res) => {
    try {
        logger.debug('--- find by Id ---');
        let id = req.params.id;
        if (!ObjectId.isValid(id)) return res.status(400).send("id is invalid");

        queryId(id).then(data => {
            if (data.length == 0) return res.status(204).send("Data Not Found");
            res.send({ success: true, data });
        }).catch(err => {
            res.status(400).send(err.message);
        });

    } catch (ex) {
        res.status(400).send(ex.message);
    }
}

exports.findfilter = (req, res) => {
    logger.debug('--- find filter ---');
    let payload = req.body;
    Provinces.find(payload).then(data => {
        res.send({
            success: true,
            count: data.length,
            data
        });
    }).catch(err => {
        res.status(400).send(err);
    });
}

exports.create = (req, res) => {
    logger.debug('--- create ---');
    let payload = req.body;
    let result = validation(payload);
    if (result) {
        res.status(400).send(result.details[0].message);
        return;
    }

    let provinces = new Provinces(payload);
    res.send(provinces);
}

exports.delete = (req, res) => {
    logger.debug('--- delete ---');
    let id = req.params.id;
    if (!ObjectId.isValid(id)) {
        res.status(400).send("id is invalid");
        return false;
    }
    queryId(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(400).send(err);
    });
}

exports.update = (req, res) => {
    logger.debug('--- update ---');
    let id = req.params.id;
    if (!ObjectId.isValid(id)) {
        res.status(400).send("id is invalid");
        return false;
    }
    queryId(id).then(data => {
        let province = data;
        let payload = req.body;
        res.send(payload);
    }).catch(err => {
        res.status(400).send(err);
    });
}

function queryId(id) {
    return new Promise((resolve, reject) => {
        Provinces.findById(id).then(data => {
            resolve(data);
        }).catch(err => {
            reject(err);
        });
    });
}

function validation(payload) {
    let schema = {
        ROW_ID: Joi.string().required(),
        PROVINCE_ROWID: Joi.string().required(),
        PROVINCE_ID: Joi.string().required().max(3).lowercase(),
        PROVINCE_NAME: Joi.string().required(),
        PROVINCE_SUP_TYPE: Joi.string().required().max(3).lowercase(),
        PROVINCE_USE_FLAG: Joi.string().required().max(1),
        BUSINESS_TYPE: Joi.string(),
        REGION: Joi.strict().required(),
    };

    return Joi.validate(payload, schema).error;
}

