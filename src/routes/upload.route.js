const router = require('express').Router();
const multer = require('multer');
const upload = multer(require('../config/lib/multer'));

router.post('/upload', upload.single('file'), (req, res) => {
  res.send();
});

module.exports = router;