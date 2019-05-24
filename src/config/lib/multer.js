const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const fileFilter = (req, file, cb) => {
  console.log(file);
  if (!file.originalname.endsWith('.pdf')) {
    return cb('Plase upload pdf', false)
  }
  return cb(null, true)
}

const limits = {
  fileSize: 1024 * 1024 * 5
}

module.exports = {
  storage,
  fileFilter,
  limits
}