var express = require('express');
var router = express.Router();
const {upload_media_s3} = require("../controller/media-controller")



const {upload_draft, edit_draft,all_posts,get_post_from_id} = require('../controller/post-controller')

router.get('/all',all_posts);

router.get('/:id',get_post_from_id);

router.post('/upload',upload_media_s3);

router.post('/createdraft',upload_draft)

router.put('/editdraft',edit_draft(false))

router.put('/savedraft', edit_draft(true))

module.exports = router;