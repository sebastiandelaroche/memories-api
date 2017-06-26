
require('./globals')();

const express 		= require('express');
const app 			= express();
const bodyParser  	= require('body-parser');
const formidable  	= require('express-formidable');


// config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(formidable());


app.use((req, res, next) => {

 	// Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();

});


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