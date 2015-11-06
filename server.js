var express = require('express');
var app = express();
var Template = require('xlsx-template');
var fs =require('fs');
var path = require('path');
var bodyParser = require('body-parser');

var requestJson = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.get('/api/user', function (req, res) {
  res.json(requestJson);
});

app.post('/api', function (req, res) {
	requestJson = req.body;
	fs.readFile(path.join(__dirname,'templates','narudzbenica.xlsx'), function (err, data){
	var template = new Template(data);
	var sheetNumber = 1;
	
	template.substitute(sheetNumber,requestJson);
	var data1 = template.generate();
	console.log(requestJson);
	if(err)console.error('pukla greska');
	else console.log('dokument popunjen');
		res.send(data1);
});
});

app.listen(8080, function () {
  console.log('server up and running at 8080 port');
});