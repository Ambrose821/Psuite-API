var express = require('express');
var router = express.Router();
const {upload_media_s3} = require("../controller/media-controller")



const {upload_draft, edit_draft,all_posts,get_post_from_id,delete_post_by_id, get_scheduled_posts_in_range} = require('../controller/post-controller')

//Get all posts
router.get('/all',all_posts);



//Get posts in a specific date range
router.get('/scheduled',get_scheduled_posts_in_range)
//Get post by id
router.get('/:id',get_post_from_id);




//Upload a file to aws s3 bucket
router.post('/upload',upload_media_s3);

//Create a draft post
router.post('/createdraft',upload_draft)

//Edit a post without saving previous version
router.put('/editdraft',edit_draft(false))

//Edit post and save praveious version
router.put('/savedraft', edit_draft(true))

//Delete Post by id
router.delete('/delete/:id',delete_post_by_id)




module.exports = router;