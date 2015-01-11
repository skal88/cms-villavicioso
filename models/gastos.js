exports = module.exports = function(app, mongoose) {

	var gastosSchema = new mongoose.Schema({
		title: 		 { type: String },
		description: { type: String },
		date: 		 { type: Date, default: Date.now },
		//price:  	 { type: Number, min: 0, max: 999, default: 1 },
		user:  		 { type: String },
	});

	mongoose.model('Gastos', gastosSchema);

};
