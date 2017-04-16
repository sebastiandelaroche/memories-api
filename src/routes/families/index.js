
const express  = require('express');
const router   = express.Router();
const Families = require('../../models/Families/model');
const fs	   = require('fs');

const MESSAGES = JSON.parse(fs.readFileSync( __dirname + '/message.json', 'utf8'));


/**
 *	@description Create family
 *
 * 	@author sebastian.delaroche
 * 	@since 16/04/2016
 *
 * 	The params come from http body
 * 		
 * 	@param {[String]} 	[name] 			[Name family]
 * 	@param {[Strinf]}   [description] 	[Description family]
 * 	@param {[Array]}  	[owner] 		[Owner family]
 * 	
 */
router.post('/', (req, res, next) => {

	const { name, description, owner } = req.body;

	let family = new Families({
		name: name,
		description: description,
		owner: owner,
		peoples: [ owner ]
	});

	family.save().then(result => {

		const message = MESSAGES.SUCCESS.CREATE.replace('%family%', result.name);
		res.status(200).json(helpers.response(message, result, 200));

	})
	.catch(err => {

		const message = MESSAGES.ERROR.CREATE.replace('%message%', err.message);
		res.status(500).json(helpers.response(message, null, 500));

	})

});



module.exports = router;