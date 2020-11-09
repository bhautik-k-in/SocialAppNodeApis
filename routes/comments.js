const express = require('express');
const router = express.Router({ mergeParams: true });
const commentControl = require("../controller/commentController")
const { protect, isAuthorized } = require("../middleware/authRoutes")


router.route('/')
    .post(protect, isAuthorized('Admin', 'Users'), commentControl.addComment)

router.route('/:id')
    .get(commentControl.getComment)
    .put(protect, isAuthorized('Admin', 'Users'), commentControl.editComment)
    .delete(protect, isAuthorized('Admin', 'Users'), commentControl.deleteComment)

module.exports = router;
