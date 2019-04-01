const Users = require('mongoose').model('Users');


exports.findByToken = (req, res, next) => {
    let token = req.header('x-auth');
    if (!token) return res.status(400).send("Token is Empty");

    Users.findByToken(token).then(user => {
        req.user = user;
        req.token = token;
        next();
    }).catch(err => res.status(404).send(err));
}

