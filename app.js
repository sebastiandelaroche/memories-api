
require('./globals')();

const express 		= require('express')
const app 			= express()
const multer  		= require('multer')


// config
app.use(multer().any());


app.use((req, res, next) => {

 	// Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (!req.body)
    	req.body = {};

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