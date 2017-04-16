
const   mongoose   	= require('mongoose'),
       	Schema 		= mongoose.Schema;


const Families = new Schema({

	name: { 
		type: String, 
		required: true 
	},

	description: String,

	owner: { 
		type: Schema.Types.ObjectId, 
		required: true 
	},
	
	peoples: { 
		type: [Schema.Types.ObjectId] 
	}
	
});


module.exports = Families;