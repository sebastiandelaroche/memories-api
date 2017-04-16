
const express  = require('express');
const router   = express.Router();
const Peoples  = require('../../models/Peoples/model');
const fs	   = require('fs');

const MESSAGES = JSON.parse(fs.readFileSync( __dirname + '/message.json', 'utf8'));


/**
 *	@description Create people 
 *
 * 	@author sebastian.delaroche
 * 	@since 16/04/2016
 *
 * 	The params come from http body
 * 		
 * 	@param {[String]} [user] 		[Name user for people]
 * 	@param {[Object]} [name] 		[Complete name people]
 * 	@param {[Date]}   [birthday] 	[Birthday for people]
 * 	@param {[Array]}  [families] 	[Ids Families of people]
 * 	
 */
router.post('/', (req, res, next) => {

	const { user, names, lastNames, birthday } = req.body;

	let people = new Peoples({
		user: user,
		name: { first: names,  last: lastNames },
		birthday: birthday,
		families: []
	});

	people.save().then(result => {

		const message = MESSAGES.SUCCESS.CREATE.replace('%user%', result.user);
		res.status(200).json(helpers.response(message, result, 200));

	})
	.catch(err => {

		const message = MESSAGES.ERROR.CREATE.replace('%message%', err.message);
		res.status(500).json(helpers.response(message, null, 500));

	})

});


module.exports = router;