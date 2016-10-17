var express = require('express');
var router = express.Router();

/* GET measurement listing. */
router.get('/', function(req, res, next) {
	// Render the historical.ejs view
	res.render('historical', { title: 'Historical'});
});

module.exports = router;
