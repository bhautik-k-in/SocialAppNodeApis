const express = require('express');
const router = express.Router();
const userControl = require("../controller/userController");



/**
 * @swagger
 * @description LOGIN ROUTE FOR USER LOGIN
 */
router.route('/')
  .post(userControl.userLogin)


/**
 * @description REGISTER ROUTE FOR USER REGISTRATION
 */
router.route('/r')
  .post(userControl.userRegister)


module.exports = router;
