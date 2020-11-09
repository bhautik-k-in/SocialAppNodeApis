const express = require('express')
const postControl = require("../controller/postController")
const comments = require("./comments")
const router = express.Router()
const POST = require("../model/connection").post
const advanceSearch = require("../middleware/globalSearch")
const { protect, isAuthorized } = require("../middleware/authRoutes")



/**
 * @description RE-ROUTE TO COMMENT ROUTER
 */
router.use("/:postid/comments", comments)


/**
 * @description ROUTES FOR GET ALL POSTS AND CREATE NEW POST METHODS 
 */
router.route('/')
    .get(advanceSearch(POST), postControl.posts)
    .post(protect, isAuthorized('Admin', 'Users'), postControl.addPost)



/**
 * @description ROUTES FOR GET SINGLE POST, UPDATE AND DELETE METHODS
 */
router.route('/:id')
    .get(postControl.getPost)
    .put(protect, isAuthorized('Admin', 'Users'), postControl.editPost)
    .delete(protect, isAuthorized('Admin', 'Users'), postControl.deletePost)


module.exports = router;
