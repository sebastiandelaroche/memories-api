
const connection	= 	require('../connection'),
	  schema 		=   require('./schema');

module.exports 	= connection.model('Peoples', schema);