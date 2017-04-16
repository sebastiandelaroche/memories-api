// @todo mejorar

const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb://localhost/memories_test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', console.error.bind(console, 'Connection to mongodb successfully ....'));

module.exports = connection;