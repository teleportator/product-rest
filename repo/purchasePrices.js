var mongo = require('mongodb');

var server = new mongo.Server('localhost', 27017, {auto_reconnect: true});
var db = new mongo.Db('productCatalog', server);

var collectionName = 'purchasePrices';

db.open(function (err, db) {
    if (!err) {
        db.collection(collectionName, {strict: true}, function (err, collection) {
            if (err) {
                db.createCollection(collectionName, {strict: true}, function (err, collection) {
                    if (err) {
                        console.log('Unable to create collection ' + collectionName);
                        res.send(500);
                    }
                });
            }
        })
    } else {
        console.log(err);
    }
})

exports.insert = function (record, callback) {
    db.collection(collectionName, function (err, collection) {
        collection.insert(record, {safe: true}, callback);
    });
};