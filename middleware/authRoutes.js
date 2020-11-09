const jwt = require("jsonwebtoken")
const asyncHandler = require("./async")
const erroResponse = require("../utils/errorResponse")
const USERS = require("../model/connection").user
require("dotenv/config")



/**
 * @description TO PROTECT ROUTES
 */
exports.protect = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    } else if (req.cookie.token) {
        token = req.cookie.token
    }

    if (!token) {
        return next(new erroResponse(`Not Autharized to access this route`, 401))
    }

    /**
     * @description VERIFY TOKEN 
     */
    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.role = decoded.role
        req.user = await USERS.findById(decoded.id)
        next()
    } catch (error) {
        console.log(error)
        return next(new erroResponse(`Not Autharized to access this route`, 401))
    }
})




/**
 * @description TO ACCESS ONLY SPECIFIED ROLES
 */
exports.isAuthorized = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.role)) {
            return next(new erroResponse(`You are not authorized to access this route.`, 403))
        }
        next()
    }
}