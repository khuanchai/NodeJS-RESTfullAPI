const multer = require('multer');

module.exports = {
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  }),

  // fileFilter(req, file, cb) {
  //   console.log(file);
  //   if (!file.originalname.endsWith('.pdf')) {
  //     return cb('Plase upload pdf', false)
  //   }

  //   return cb(null, true)


  // },

  // limits: {
  //   fileSize: 1024 * 1024 * 5
  // }

}