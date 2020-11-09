const express = require('express');
const router = express.Router();


/**
 * @description INDEX ENTRY ROUTE
 * @Route       GET /api/v1/
 * @access      PUBLIC[for all users] 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
router.get('/', async (req, res, next) => {
  await res.redirect("/api/v1/users")
})

module.exports = router;
