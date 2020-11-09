/**
 * @description Async/await handler 
 */
module.exports = asyncHandler = fun => (req, res, next) =>
    Promise.resolve(fun(req, res, next)).catch(next)

/**
 * @todo LEARN ABOUT ASYNCHANDLER WITH TRY CATCH
 */