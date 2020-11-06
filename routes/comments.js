const express = require('express');
const router = express.Router();
const commentControl = require("../controller/commentController")


router.get('/:id', commentControl.getComment)

router.post("/", commentControl.addComment)

router.put("/:id", commentControl.editComment)

router.delete('/:id', commentControl.deleteComment)


/**
 * @todo IS THIS TYPE OF ROUTE IS PROPER OR NOT
 */

router.route('/')
    .post(commentControl.addComment)

router.route('/:id')
    .get(commentControl.getComment)
    .get(commentControl.editComment)
    .delete(commentControl.deleteComment)

module.exports = router;
