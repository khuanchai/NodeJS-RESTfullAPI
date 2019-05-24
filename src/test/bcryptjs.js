var bcrypt = require('bcryptjs');
var passowrd = "B4c0/\/"
var hash;
bcrypt.genSalt(10, function (err, salt) {
   bcrypt.hash(passowrd, salt, function (err, hash) {
      console.log(hash);

      // Load hash from your password DB.
      bcrypt.compare(passowrd, hash, function (err, res) {
         console.log(res);
      });

   });
});



