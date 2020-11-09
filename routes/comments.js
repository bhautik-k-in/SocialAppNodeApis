const express = require('express');
const router = express.Router({ mergeParams: true });
const commentControl = require("../controller/commentController")
const { protect, isAuthorized } = require("../middleware/authRoutes")



/**
 * @description ROUTE FOR CREATE NEW COMMENT METHOD
 */
router.route('/')
    .post(protect, isAuthorized('Admin', 'Users'), commentControl.addComment)



/**
 * @description ROUTES FOR GET SINGLE COMMENT, UPDATE COMMENT AND DELETE COMMENT METHODS
 */
router.route('/:id')
    .get(commentControl.getComment)
    .put(protect, isAuthorized('Admin', 'Users'), commentControl.editComment)
    .delete(protect, isAuthorized('Admin', 'Users'), commentControl.deleteComment)


module.exports = router;
