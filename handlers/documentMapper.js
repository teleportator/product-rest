exports.mapPurchasePrices = function (prices, callback) {
    var doc = {prices: []};
    var length = prices.length;
    for (var i = 0; i < length; i++) {
        doc.prices.push({price: prices[i].price, code: prices[i].price, title: prices[i].title});
    }
    callback(null, doc);
};