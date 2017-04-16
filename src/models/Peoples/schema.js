
const   mongoose   	= require('mongoose'),
       	Schema 		= mongoose.Schema;


const Peoples = new Schema({

	user: { 
		type: String, 
		required: true 
	},

	name: { 
		first: String, 
		last: String 
	},

	birthday: Date,
	
	families: Array
	
});


module.exports = Peoples;