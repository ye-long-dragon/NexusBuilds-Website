const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('LandingPage/index');
});

module.exports = router;
