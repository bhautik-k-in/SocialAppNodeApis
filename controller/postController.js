const errorResponse = require("../utils/errorResponse")
const POST = require("../model/connection").post
const asyncHandler = require("../middleware/async")

/**
 * @description GET ALL POSTS [ WITH USER LOGIN / WTHOUT USER LOGIN BOTH]
 * @Route       GET /api/v1/posts/
 * @access      PUBLIC[for all users] / PRIVATE[for individual user]
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.posts = asyncHandler(async (req, res, next) => {
    let posts = await POST.find()
    posts = await posts.filter(post => post.isDeleted == false)
    if (!posts) {
        return next(new errorResponse(`Posts Are Not Available`, 404))
    }
    res.status(200).json({ success: true, data: posts })
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
    const post = await POST.findById(req.params.id)
    if (!post) {
        // PROPER FORMATTED ID BUT WRONG ID
        return next(new errorResponse(`Post Not Available With Id ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, data: post })
    // } catch (error) {
    //     // res.status(400).json({ success: false, error: error });
    //     /**
    //      * @description for both cases 1: id is totally wrong 2: id is well structured but wrong id which is not available in db
    //      */
    //     // NOT FORMATTED ID
    //     next(error)
    // }
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
    const post = await POST.create(req.body)
    res.status(201).json({ success: true, data: post })
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
    const post = await POST.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!post) {
        // PROPER FORMATTED ID BUT WRONG ID
        return next(new errorResponse(`Post Not Available With Id ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, data: post })
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
    const post = await POST.findByIdAndUpdate(req.params.id, { isDeleted: true }, {
        new: true
    })
    if (!post) {
        return next(new errorResponse(`Post Not Available With Id ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, data: post })
})