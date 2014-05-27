var express = require('express');
var products = require('../products.js');
var router = express.Router();

router.get('/', function(req, res) {
    products.findAll(req, res);
});
router.get('/:id', function(req, res) {
    products.findById(req, res);
});

module.exports = router;