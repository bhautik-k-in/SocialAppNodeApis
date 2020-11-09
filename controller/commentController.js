const COMMENT = require("../model/connection").comment
const errorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const POST = require("../model/postModel")
const { comment } = require("../model/connection")
const USER = require("../model/connection").user



/**
 * @description GET ALL COMMENTS ON POST FOR EDIT
 * @Route       GET /api/v1/comments/:commentid OR /api/v1/posts/:postid/comments
 * @access      PUBLIC 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getComments = asyncHandler(async (req, res, next) => {
    let query
    if (req.params.postid) {
        query = COMMENT.find({ post: req.params.postid, isDeleted: false, deletedBy: null }).populate({
            path: 'post',
            select: 'title description'
        }).populate({
            path: 'user',
            select: 'email lastName'
        })
    } else {
        query = COMMENT.find({ isDeleted: false, deletedBy: null }).populate({
            path: 'post',
            select: 'title description'
        }).populate({
            path: 'user',
            select: 'email lastName'
        })
    }

    const comments = await query

    if (!comments) {
        return next(new errorResponse(`Comments Are Not Available`, 404))
    }
    res.status(200).json({ success: true, count: comments.length, message: `All comments based on post ID`, commentInformation: comments })
})






/**
 * @description GET SINGLE COMMENT ON POST FOR EDIT
 * @Route       GET /api/v1/comments/:id OR /api/v1/posts/:postid/comments/:commentid
 * @access      PUBLIC 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getComment = asyncHandler(async (req, res, next) => {
    let comments = await COMMENT.findById({ _id: req.params.id, isDeleted: false, deletedBy: null }).populate({
        path: 'post',
        select: 'title description'
    }).populate({
        path: 'user',
        select: 'email lastName'
    })

    if (!comments) {
        return next(new errorResponse(`Comment is Not Available`, 404))
    }
    res.status(200).json({ success: true, count: comments.length, message: `Single comment using Comment ID`, data: comments })
})




/**
 * @description ADD NEW COMMENT ON POST
 * @Route       POST /api/v1/comments OR /api/v1/posts/:postid/comments
 * @access      PRIVATE
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.addComment = asyncHandler(async (req, res, next) => {

    let post = await POST.findById(req.params.postid)
    if (!post) {
        return next(new errorResponse(`The post is not available `, 404))
    }

    req.body.user = req.user._id
    req.body.post = req.params.postid

    const comment = await COMMENT.create(req.body)
    post.comments.push(comment._id)

    await POST.findByIdAndUpdate(req.params.postid, { comments: post.comments })

    res.status(201).json({ success: true, message: 'Comment added successfully', data: comment })
})





/**
 * @description EDIT COMMENT [ ONLY EDITED BY COMMENT ADD USER NOT BY POST USER]
 * @Route       PUT /api/v1/comments/:id OR /api/v1/posts/:postid/comments/:commentid
 * @access      PRIVATE
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.editComment = asyncHandler(async (req, res, next) => {

    let comment = await COMMENT.findById(req.params.id)
    if (!comment) {
        return next(new errorResponse(`Comment Not Available With Id ${req.params.id}`, 404))
    }

    // MAKE SURE POST OWNER AND COMMENT OWNER AND ADMIN CAN ONLY EDIT COMMENT
    if (comment.user.toString() !== req.user._id && req.user.role !== 'Admin') {
        return next(new errorResponse(`User ${req.user.id} is not authorized to update this comment`, 401))
    }

    req.body.updatedAt = Date.now()
    comment = await COMMENT.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({ success: true, message: `Comment updated successfully.`, data: comment })
})





/**
 * @description DELETE COMMENT [ BOTH CAN DELETE [ USER OF POST / USER OF COMMENT ]]
 * @Route       DELETE /api/v1/comments/:id OR /api/v1/posts/:postid/comments/:commentid
 * @access      PUBLIC
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteComment = asyncHandler(async (req, res, next) => {
    // post creator when delete post it will be deleted....OR when comment creator delete then it will deleted.....OR owner of comment can also delete it

    let _deletedComment = await COMMENT.findById(req.params.id)

    if (!_deletedComment) {
        return next(new errorResponse(`Comment Not Available With Id ${req.params.id}`, 404))
    }

    let postOwner = await POST.findById(req.params.postid)

    // MAKE SURE POST OWNER AND COMMENT OWNER AND ADMIN CAN ONLY DELETE COMMENT
    if (_deletedComment.user.toString() !== req.user._id && postOwner.user.toString() !== req.params.postid && req.user.role !== 'Admin') {
        return next(new errorResponse(`User ${req.user.id} is not authorized to delete this comment`, 401))
    }

    _deletedComment = await COMMENT.findByIdAndUpdate(req.params.id, {
        isDeleted: true,
        deletedBy: req.user._id,
        deletedAt: Date.now(),
        new: true
    })

    const index = postOwner.comments.indexOf(_deletedComment._id);
    if (index > -1) {
        postOwner.comments.splice(index, 1);
    }
    postOwner.save()

    res.status(200).json({ success: true, message: 'Comment deleted successfully', data: _deletedComment })
})