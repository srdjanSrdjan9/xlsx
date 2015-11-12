var express = require('express');
var app = express();
var Template = require('xlsx-template');
var fs =require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var Docxtemplater = require('docxtemplater');
var zip = require('jszip');

var cors = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');  
  next();
};

var requestJson = {
    number: 123,
    billNumber: 456,
    deliveryDate: '2016-06-02',
    deliveryType: "shipping",
    distributor: "Majstor Bob",
  company:{
      name: "ASD",
      town: "Uzice",
      adress: "Tkacka 12"
    },
    company1:{
     name: "ASD",
      town: "Uzice",
      adress: "Tkacka 12" 
    },
    items: [
    {number: 1,
    code: 123456,
    description: "knjige",
    something: "asd",
    m: "kg",
    quantity: 44,
    price: 100,
    percentage: 10,
    sumPrice: 440
    },
    {number: 1,
    code: 123456,
    description: "knjige",
    something: "asd",
    m: "kg",
    quantity: 44,
    price: 100,
    percentage: 10,
    sumPrice: 440
    }
    ]   
  };

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.get('/apidoc', cors , function (req, res) {
  var fs = require('fs');
var Docxtemplater = require('docxtemplater');

//Load the docx file as a binary
var content = fs
    .readFileSync(__dirname + "/templates/tagExample.docx", "binary");

var doc = new Docxtemplater(content);

//set the templateVariables
doc.setData({
    "first_name":"Hipp",
    "last_name":"Edgar",
    "phone":"0652455478",
    "description":"New Website"
});

//apply them (replace all occurences of {first_name} by Hipp, ...)
doc.render();

var buf = doc.getZip()
             .generate({type:"nodebuffer"});

fs.writeFileSync(__dirname+"/templates/output_converted.docx",buf);
res.send(buf);
});




app.get('/api', cors, function (req, res) {
	//requestJson = req.body;
	fs.readFile(path.join(__dirname,'templates','narudzbenica.xlsx'), function (err, data){
	var template = new Template(data);
	var sheetNumber = 2;
	
	template.substitute(sheetNumber,requestJson);
	var data1 = template.generate();

	//console.log(requestJson);
	if(err)console.error('pukla greska');
	else {
		fs.writeFileSync(__dirname+"/templates/narudzbenica.xlsx",data1);
res.send("SUCCESS!!!");
		console.log('dokument popunjen');
	}
});
});

app.listen(8080, function () {
  console.log('server up and running at 8080 port');
});