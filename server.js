
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  
	res.json({ message: "Hello World from heroku for project memories ;) !!!" });


});

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port ' + process.env.PORT);
});