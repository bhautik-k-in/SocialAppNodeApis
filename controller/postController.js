const errorResponse = require("../utils/errorResponse")
const POST = require("../model/connection").post
const asyncHandler = require("../middleware/async")
const USER = require("../model/connection").user
const COMMENT = require("../model/connection").comment

/**
 * @description GET ALL POSTS [ WITH USER LOGIN / WITHOUT USER LOGIN BOTH]
 * @Route       GET /api/v1/posts/
 * @access      PUBLIC[for all users] / PRIVATE[for individual user]
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.posts = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.postMiddleware)
})





/**
 * @description GET SINGLE POSTS [ WITH USER LOGIN / WTHOUT USER LOGIN BOTH]
 * @Route       GET /api/v1/posts/
 * @access      PUBLIC[for all users] / PRIVATE[for individual user]
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getPost = asyncHandler(async (req, res, next) => {
    const post = await POST.findOne({ _id: req.params.id, isDeleted: false, deletedBy: null }).populate({
        path: 'comments',
        select: 'message'
    }).populate({
        path: 'user',
        select: 'email lastName'
    }).populate({
        path: 'deletedBy',
        select: 'email lastName'
    })

    if (!post) {
        return next(new errorResponse(`Post Not Available With Id ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, message: `Single post through Post ID`, data: post })
})





/**
 * @description ADD NEW POST
 * @Route       POST /api/v1/posts
 * @access      PRIVATE
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.addPost = asyncHandler(async (req, res, next) => {
    req.body.user = req.user._id
    const post = await POST.create(req.body)
    res.status(201).json({ success: true, message: `Post added successfully`, data: post })
})





/**
 * @description EDIT POST
 * @Route       PUT /api/v1/posts/:id
 * @access      PRIVATE
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.editPost = asyncHandler(async (req, res, next) => {


    let post = await POST.findByIdAndUpdate(req.params.id)

    if (!post) {
        return next(new errorResponse(`Post Not Available With Id ${req.params.id}`, 404))
    }

    // MAKE SURE USER IS POST OWNER
    if (post.user.toString() !== req.user._id && req.user.role !== 'Admin') {
        return next(new errorResponse(`User ${req.user.id} is not authorized to update this post`, 401))
    }

    req.body.updatedAt = Date.now()
    post = await POST.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    }).populate({
        path: 'comments',
        select: 'message'
    }).populate({
        path: 'user',
        select: 'email lastName'
    })


    res.status(200).json({ success: true, message: `Post updated successfully`, data: post })
})






/**
 * @description DELETE POST
 * @Route       DELETE /api/v1/posts/:id
 * @access      PRIVATE
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deletePost = asyncHandler(async (req, res, next) => {
    let post = await POST.findById(req.params.id)

    //    MAKE SURE USER IS POST OWNER
    if (post.user.toString() !== req.user._id && req.user.role !== 'Admin') {
        return next(new errorResponse(`User ${req.user.id} is not authorized to update this post`, 401))
    }

    post = await POST.findByIdAndUpdate(req.params.id, {
        isDeleted: true,
        deletedBy: req.user._id,
        deletedAt: Date.now(),
        new: true
    })

    COMMENT.updateMany()

    let _deleteComments = await COMMENT.find({ post: req.params.id })

    // give deleted and deletedat in one foreach loop
    _deleteComments.forEach(comment => comment.isDeleted = true)

    if (!post) {
        return next(new errorResponse(`Post Not Available With Id ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, message: `Post deleted successfully`, data: post })
})
