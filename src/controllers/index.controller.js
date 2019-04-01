const logger = require('../config/lib/log4js');
const chalk = require('chalk');

const MEANStack = [
    { id: 1, name: 'MongoDB' },
    { id: 2, name: 'ExpressJS' },
    { id: 3, name: 'NodeJS' },
    { id: 4, name: 'Agnular' },
];

exports.read = (req, res) => {
    res.send(MEANStack);
}

exports.readOne = (req, res) => {
    let id = parseInt(req.params.id);
    let lang = MEANStack.find(item => item.id == parseInt(id));
    logger.debug(lang);
    if (!lang) {
        res.status(404).send({ error: 'data not found' });
    } else {
        res.send(lang);
    }
}

exports.create = (req, res) => {
    let id = MEANStack.length + 1;
    MEANStack.push({
        id,
        name: req.body.name
    });
    res.send(MEANStack);
}

exports.delete = (req,res) => {
    let id = parseInt(req.params.id);
    let filter = MEANStack.filter(item => item.id !== parseInt(id));
    res.send(filter);
}
