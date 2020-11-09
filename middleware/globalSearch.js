/**
 * @description MIDDLEWARE FOR GLOBAL MODEL AND POPULATE / JUST TO CHECK
 */

module.exports = (model) => async (req, res, next) => {

    let result = await model.find(req.query).populate({
        path: 'comments',
        select: 'message'
    }).populate({
        path: 'user',
        select: 'email lastName'
    })

    result = await result.filter(p => p.isDeleted == false)

    // IF LOGIN THEN DON'T ADD LOGGED IN USER'S POSTS IN RESULT 
    // TODO
    if (req.user) {
        result = await result.filter(p => p.user._id.toString() !== req.user._id)
    }

    if (!result) {
        return next(new errorResponse(`Resources Are Not Available`, 404))
    }

    res.postMiddleware = {
        success: true,
        count: result.length,
        message: 'All available posts',
        data: result
    }
    next()
}

