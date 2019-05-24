const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let passowrd = "B4c0/\/";
// var hash;
// bcrypt.genSalt(10, function (err, salt) {
//   bcrypt.hash(passowrd, salt, function (err, hash) {
//     console.log(hash);
//     // Load hash from your password DB.
//     bcrypt.compare("B4c0/\/", hash, function (err, res) {
//       console.log(res);
//     });

//   });



// });

let salt = bcrypt.genSaltSync(10);
let hash = bcrypt.hashSync(passowrd, salt);
let check = bcrypt.compareSync('passowrd',hash);
console.log(check);
// let payload = { foo: 'aaa' };
// let secretOrPrivateKey = 'shhhhh';
// let token = jwt.sign(payload, secretOrPrivateKey);
// let decoded = jwt.verify(token, secretOrPrivateKey);
// console.log(decoded);