
const express  = require('express');
const router   = express.Router();
const Peoples  = require('../../models/Peoples/model');
const fs	   = require('fs');
const help 	   = require('help-modules');

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

	const { user, names, lastName, birthday } = req.body;
	const fieldsValidate = ['user', 'names', 'lastName'];

	for (var i = 0; i < fieldsValidate.length; i++) {
		if (typeof req.body[fieldsValidate[i]] === 'undefined' || req.body[fieldsValidate[i]].length === 0) {
			res.status(500).json(helpers.response(`The fields ${fieldsValidate[i]} cannot empty.`, null, 500));
			return;
		}
	}

	let people = new Peoples({
		user,
		name: { first: names,  last: lastName },
		birthday,
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


// @TODO Ni por el putas esto se puede queda así !!!
router.get('/', (req, res, next) => {

	Peoples.find({}).then(result => {

		res.status(200).json(helpers.response('Success peoples: ', result, 200));

	})
	.catch(err => {

		const message = MESSAGES.ERROR.CREATE.replace('%message%', err.message);
		res.status(500).json(helpers.response(message, null, 500));

	})

});


router.post('/upload', (req, res) => {

	const {files} = req.files;
	
	help.uploadFile.upload({

		stream: files.path,
		dest: `tmp`,
		name: files.name

	}, (err, data) => {

		if(err)
			res.status(500).json(helpers.response('', 'error', 500));
		else
			res.status(200).json(helpers.response('', 'success', 200));

	});

});


module.exports = router;