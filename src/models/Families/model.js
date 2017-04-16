
const connection	= 	require('../connection'),
	  schema 		=   require('./schema');

module.exports 	= connection.model('Families', schema);