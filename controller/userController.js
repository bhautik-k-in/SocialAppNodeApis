const USERS = require("../model/connection").user
const asyncHandler = require("../middleware/async")
const errorResponse = require("../utils/errorResponse")
const ROLE = require("../model/connection").role
require("dotenv/config")



/**
 * @description USER LOGIN PAGE
 * @Route       POST /api/v1/users
 * @access      PUBLIC
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.userLoginPost = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new errorResponse(`Please provide email and password`, 400))
    }

    const user = await USERS.findOne({ email })

    if (!user) {
        return next(new errorResponse(`Invalid Credentials`, 401))
    }

    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
        return next(new errorResponse(`Invalid Credentials`, 401))
    }


    /**
      * @description TOKEN GENERATED
      */
    sendToTokenResponse(user, 200, res)
})



/**
 * @description USER REGISTER PAGE
 * @Route       POST /api/v1/users/r OR /api/v1/role
 * @access      PUBLIC
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.userRegisterPost = asyncHandler(async (req, res, next) => {
    const userData = await ROLE.findOne({ name: "Users" })
    req.body.role = userData._id
    const user = await USERS.create(req.body)

    /**
     * @description TOKEN GENERATED
     */
    sendToTokenResponse(user, 200, res)
})




/**
 * @description GENERATE TOKEN AND SET IT INTO COOKIE COMMONG METHOD
 */
const sendToTokenResponse = (user, statusCode, res) => {

    const token = user.getSignedJwtToken()


    /**
     * @description FOR PRODUCTION ENVIRONMENT, YOU CAN SET secure:true for HTTPS
     */
    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }


    res.setHeader("auth-token", token)
    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            message: `Successfull`,
            token
        })
}