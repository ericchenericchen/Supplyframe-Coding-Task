var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('CALLED BACK!! Sending troops :horse: :cow: :horse:');
});

module.exports = router;
