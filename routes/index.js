var express = require('express');
var router = express.Router();
const {upload_media_s3} = require("../controller/media-controller")



const {upload_draft, edit_draft} = require('../controller/post-controller')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).body("Psuite")
});


module.exports = router;
