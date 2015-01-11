//File: controllers/tvshows.js
var mongoose = require('mongoose');
var Gastos  = mongoose.model('Gastos');

//GET - Return all tvshows in the DB
exports.findAllGastos = function(req, res) {
	Gastos.find(function(err, gastos) {
    if(err) res.send(500, err.message);

    console.log('GET /gastos')
		res.status(200).jsonp(gastos);
	});
};

//GET - Return a TVShow with specified ID
exports.findById = function(req, res) {
	Gastos.findById(req.params.id, function(err, gasto) {
    if(err) return res.send(500, err.message);

    console.log('GET /gasto/' + req.params.id);
		res.status(200).jsonp(gasto);
	});
};

//POST - Insert a new TVShow in the DB
exports.addGasto = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var gasto = new Gastos({
		title:  req.body.title,
		description: req.body.description,
		date: 	req.body.date,
		price:  req.body.price,
		user:   req.body.user,
	});

	gasto.save(function(err, gasto) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(gasto);
	});
};


//PUT - Update a register already exists
exports.updateGasto = function(req, res) {
	Gastos.findById(req.params.id, function(err, gasto) {
		gasto.title   = req.body.title; //req.body.petId;
		gasto.description = req.body.description;
		gasto.date    = req.body.date;
		gasto.price = req.body.price;
		gasto.user  = req.body.user;

		gasto.save(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200).jsonp(gasto);
		});
	});
};

//DELETE - Delete a TVShow with specified ID
exports.deleteGasto = function(req, res) {
	Gastos.findById(req.params.id, function(err, gasto) {
		console.log(gasto)
		gasto.remove(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200).jsonp(gasto);
		})
	});
};