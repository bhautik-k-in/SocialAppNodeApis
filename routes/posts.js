const express = require('express')
const postControl = require("../controller/postController")
const comments = require("./comments")
const router = express.Router()
const POST = require("../model/connection").post
const advanceSearch = require("../middleware/globalSearch")
const { protect, isAuthorized } = require("../middleware/authRoutes")



/**
 * @description Re-route to comment router
 */
router.use("/:postid/comments", comments)


// LOGIC HERE IF HEADER ID IS THERE THEN ONLY OTHER POST WITHOUT THAT USER ELSE ALL POSTS [ WITHOUT LOGIN DISPLAY ]

/**
 * @todo IS THIS TYPE OF ROUTE IS PROPER OR NOT
 */


router.route('/')
    .get(advanceSearch(POST), postControl.posts)
    .post(protect, isAuthorized('Admin', 'Users'), postControl.addPost)

router.route('/:id')
    .get(postControl.getPost)
    .put(protect, isAuthorized('Admin', 'Users'), postControl.editPost)
    .delete(protect, isAuthorized('Admin', 'Users'), postControl.deletePost)

module.exports = router;
