const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.redirect("/api/v1/users")
})

module.exports = router;
