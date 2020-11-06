const errorResponse = require("../utils/errorResponse")

module.exports = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message
    /**
     * @desc ABOUT CUSTOM ERROR HANDLER
     */
    console.log(err.stack.red)

    /**
     * @description MONGOOSE BAD ObjectId 
     */
    if (err.name === "CastError") {
        const message = `Resource Not Available With Id ${err.value}`
        error = new errorResponse(message, 404)
    }

    /**
     * @description MONGOOSE POST DATA FAILED
     */
    if (err.code === 11000) {
        const message = `Detected Duplicate Entry`
        error = new errorResponse(message, 400)
    }

    /**
     * @description MONGOOSE VALIDATION 
     */
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(val => val.message)
        error = new errorResponse(message, 400)
    }

    res.status(error.statusCode || 500)
        .json({
            success: false,
            error: error.message || 'Server Error'
        })
}