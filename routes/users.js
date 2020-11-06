const express = require('express');
const router = express.Router();
const userControl = require("../controller/userController");
const { route } = require('./posts');


// POST METHOD FOR LOGIN
router.post('/', userControl.userLoginPost);

// POST METHOD FOR REGISTER
router.post('/r', userControl.userRegisterPost);


/**
 * @todo IS THIS TYPE OF ROUTE IS PROPER OR NOT
 */

router.route('/')
  .post(userControl.userLoginPost)

router.route('/r')
  .post(userControl.userRegisterPost)

module.exports = router;
