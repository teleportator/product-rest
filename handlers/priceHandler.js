var repo = require('../repo/purchasePrices');
var mapper = require('./documentMapper');

exports.add = function (req, res) {
    var prices = req.body;

    mapper.mapPurchasePrices(prices, function (err, record) {
        if (err) {
            res.send(400);
        } else {
            repo.insert(record, function (err, records) {
                if (err) {
                    res.send({error: 'An error has occurred. ' + err});
                } else {
                    console.log('Success: ' + JSON.stringify(records[0]));
                    res.send(records[0]);
                }
            });
        }
    });
}