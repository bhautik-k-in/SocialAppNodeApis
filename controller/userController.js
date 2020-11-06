const USERS = require("../model/connection").user
const authUser = require("../authentication/userAuth")



/**
 * @description USER LOGIN PAGE
 * @Route       POST /api/v1/users
 * @access      PUBLIC
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.userLoginPost = async (req, res, next) => {
    res.status(200).json({ success: true, msg: "LOGIN PAGE POST METHOD" });
}



/**
 * @description USER REGISTER PAGE
 * @Route       POST /api/v1/users/r
 * @access      PUBLIC
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.userRegisterPost = async (req, res, next) => {
    console.log(req.body)
    try {
        const _sanitizedUser = await authUser.validateAsync(req.body, { abortEarly: false })
        console.log(_sanitizedUser)
        const userData = await USERS.create(_sanitizedUser)
        console.log(userData)
        res.status(201).json({ success: true, data: userData })
    } catch (error) {
        res.status(400).json({ success: false, error: error })
    }
}