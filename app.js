

require('./globals')();

const express 		= require('express');
const app 			= express();
const bodyParser  	= require('body-parser');


// config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// routes
app.use('/people', require('./src/routes/peoples'));
app.use('/family', require('./src/routes/families'));


// @todo mejorar
app.use(function (req, res, next) {

    var err = new Error('Not Found');
    err.status = 404;
    res.status(404).json(err);

});


module.exports = app;