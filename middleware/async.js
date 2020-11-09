/**
 * @description CUSTOME ASYNC / AWAIT HANDLER 
 */
module.exports = asyncHandler = fun => (req, res, next) =>
    Promise.resolve(fun(req, res, next)).catch(next)

