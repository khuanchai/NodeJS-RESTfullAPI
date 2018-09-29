var crypto = require('crypto');
var User = require('mongoose').model('User');

exports.read = function (req, res) {
    new Promise((resolve, reject) => {
        User.find({}).populate('category').exec((err, users) => {
            if (err) {
                reject(res.json({ 'success': false, error: err }));
            }
            resolve(res.json({ 'success': true, data: users }));
        });
    });

}

exports.readOne = function (req, res) {
    return res.json(req.user);
}

exports.paramOne = function (req, res, next, _id) {
    User.findById({ _id: _id }, (err, user) => {
        if (!err) {
            user.password = decryptoPassword(user.password, user.salt);
            req.user = user;
        }
        next();
    });
}

exports.create = function (req, res) {
    new Promise((resolve, reject) => {
        let user = new User(req.body);
        user.salt = crypto.randomBytes(16).toString('hex');    // เข้ารหัส key
        user.password = encryptoPassword(user.password, user.salt);
        user.save((err, user) => {
            console.log(err);
            if (err) {
                reject(res.json({ 'success': false, error: err }));
            }
            resolve(res.json({ 'success': true, data: user }));
        });
    });

}

exports.update = function (req, res) {

    new Promise((resolve, reject) => {
        let userBody = req.body;
        let userReq = req.user;
        userBody.password = encryptoPassword(userBody.password, userReq.salt);
        User.updateOne({ _id: userReq._id }, userBody, (err, user) => {
            if (err) {
                reject(res.json({ 'success': false, error: err }));
            }
            resolve(res.json({ 'success': true, data: user }));
        });
    });
}

exports.delete = function (req, res) {
    new Promise((resolve, reject) => {
        req.user.remove((err, user) => {
            if (err) {
                reject(res.json({ 'success': false, error: err }));
            }
            resolve(res.json({ 'success': true, data: user }));
        });
    });
}




// เข้ารหัส
function encryptoPassword(password, salt) {
    let cipher = crypto.createCipher('aes192', salt);
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}



// ถอดรหัส
function decryptoPassword(password, salt) {
    let decipher = crypto.createDecipher('aes192', salt);
    let decrypted = decipher.update(password, 'hex', 'utf8')
    decrypted += decipher.final('utf8');
    return decrypted;
}


