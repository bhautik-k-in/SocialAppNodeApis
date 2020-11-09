const errorResponse = require("../utils/errorResponse")


/**
 * @description CUSTOME ERROR HANDLER FOR EACH AND EVERY SCHENARIO
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message

    /**
     * @description PRINT ALL ERROR STACK WITH RED COLOUR
     */
    console.log(err.stack.red)


    /**
     * @description FOR MONGOOSE BAD ObjectId ERROR
     */
    if (err.name === "CastError") {
        const message = `Resource Not Available With Id ${err.value}`
        error = new errorResponse(message, 404)
    }


    /**
     * @description FOR MONGOOSE POST DATA FAILED ERROR
     */
    if (err.code === 11000) {
        const message = `Detected Duplicate Entry`
        error = new errorResponse(message, 400)
    }


    /**
     * @description FOR MONGOOSE VALIDATION ERROR
     */
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(val => val.message)
        error = new errorResponse(message, 400)
    }


    /**
     * @description RESPONSE SEND BACK WITH ERROR AND STATUS CODE
     */
    res.status(error.statusCode || 500)
        .json({
            success: false,
            error: error.message || 'Server Error'
        })
}