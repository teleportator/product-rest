var mongo = require('mongodb');

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('testData', server);

db.open(function(err, db) {
	if(!err) {
		console.log("Connected to 'testData' database");
		db.collection('products', {strict:true}, function(err, collection) {
			if (err) {
				console.log("The 'wines' collection doesn't exist. Creating it with sample data...");
				populateDB();
			}
		});
	}
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving product: ' + id);
    db.collection('products', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

/*exports.findById = function(req, res) {
	var id = req.params.id;
	console.log('Retrieving wine: ' + id);
	db.collection('wines', function(err, collection) {
		collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
			res.send(item);
		});
	});
}; */

/*exports.findAll = function(req, res) {
	db.collection('wines', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
};*/

exports.findAll = function(req, res) {
    db.collection('products', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addWine = function(req, res) {
	var wine = req.body;
	console.log('Adding wine: ' + JSON.stringify(wine));
	db.collection('wines', function(err, collection) {
		collection.insert(wine, {safe:true}, function(err, result) {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				console.log('Success: ' + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
}

exports.updateWine = function(req, res) {
	var id = req.params.id;
	var wine = req.body;
	console.log('Updating wine: ' + id);
	console.log(JSON.stringify(wine));
	db.collection('wines', function(err, collection) {
		collection.update({'_id':new BSON.ObjectID(id)}, wine, {safe:true}, function(err, result) {
			if (err) {
				console.log('Error updating wine: ' + err);
				res.send({'error':'An error has occurred'});
			} else {
				console.log('' + result + ' document(s) updated');
				res.send(wine);
			}
		});
	});
}

exports.deleteWine = function(req, res) {
	var id = req.params.id;
	console.log('Deleting wine: ' + id);
	db.collection('wines', function(err, collection) {
		collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
			if (err) {
				res.send({'error':'An error has occurred - ' + err});
			} else {
				console.log('' + result + ' document(s) deleted');
				res.send(req.body);
			}
		});
	});
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

	var products = [
		{
			code: "001.001",
			category: {categoryId: 1, title: "Test category 1"},
			description: "Test descriptinoo 1",
			images: []
		},
		{
			code: "001.002",
			category: {categoryId: 2, title: "Test category 2"},
			description: "Test descriptinoo 2",
			images: []
		}];

	db.collection('products', function(err, collection) {
		collection.insert(products, {safe:true}, function(err, result) {});
	});

};
