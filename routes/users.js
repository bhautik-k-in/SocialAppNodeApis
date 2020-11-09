const express = require('express');
const router = express.Router();
const userControl = require("../controller/userController");

/**
 * @todo Methods for User login and register
 */

router.route('/')
  .post(userControl.userLoginPost)

router.route('/r')
  .post(userControl.userRegisterPost)

module.exports = router;
