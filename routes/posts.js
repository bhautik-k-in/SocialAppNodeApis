const express = require('express')
const router = express.Router()
const postControl = require("../controller/postController")

// LOGIC HERE IF HEADER ID IS THERE THEN ONLY OTHER POST WITHOUT THAT USER ELSE ALL POSTS [ WITHOUT LOGIN DISPLAY ]
router.get('/', postControl.posts)

router.get('/:id', postControl.getPost)

router.post('/', postControl.addPost)

router.put('/:id', postControl.editPost)

router.delete('/:id', postControl.deletePost)



/**
 * @todo IS THIS TYPE OF ROUTE IS PROPER OR NOT
 */


router.route('/')
    .get(postControl.posts)
    .post(postControl.addPost)

router.route('/:id')
    .get(postControl.getPost)
    .put(postControl.editPost)
    .delete(postControl.deletePost)

module.exports = router;
