/**
 * @description ErrorResponse with message and statusCode
 */
class errorResponse extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

module.exports = errorResponse
/**
 * @todo LEARN ABOUT THIS ERROR RESPONSE UTILS
 */