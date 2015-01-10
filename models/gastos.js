exports = module.exports = function(app, mongoose) {

	var gastosSchema = new mongoose.Schema({
		title: 		{ type: String },
		date: 		{ type: Number },
		price:  	{ type: String },
		user:  		{ type: String },
	});

	mongoose.model('Gastos', gastosSchema);

};
