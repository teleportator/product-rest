var express = require('express');
var router = express.Router();

var prices = require('../handlers/priceHandler.js')

router.post('/purchase-price', prices.add);

router.post('/recommended-price', function(req, res) {
    throw 'not implemented exception';
});

module.exports = router;