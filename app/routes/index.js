var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/taxi', function(req, res, next) {
  res.json('hello,' + JSON.stringify(req.user));
});

module.exports = router;
