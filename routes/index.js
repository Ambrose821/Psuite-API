var express = require('express');
var router = express.Router();
const {upload_video_s3} = require("../controller/video-controller")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload',upload_video_s3);

module.exports = router;
