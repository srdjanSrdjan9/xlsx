var express = require('express');
var app = express();
var XlsxTemplate = require('xlsx-template');
var path = require('path');
var bodyParser = require('body-parser');
var Docxtemplater = require('docxtemplater');
  
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
 
var content = fs
    .readFileSync(__dirname + "/templates/tagExample.docx", "binary");

var doc = new Docxtemplater(content);

doc.setData({
    "first_name":"Hipp",
    "last_name":"Edgar",
    "phone":"0652455478",
    "description":"New Website"
});

doc.render();

var buf = doc.getZip()
             .generate({type:"nodebuffer"});

fs.writeFileSync(__dirname+"/templates/output_converted.docx",buf);
var options = {
    root: __dirname + '/templates/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
res.set('Content-Type', 
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
res.send(buf);
console.log('succes!!');
});




app.get('/api', cors, function (req, res) {
  var fs = require('fs');
 fs.readFile(path.join(__dirname, 'templates', 'narudzbenica.xlsx'), function(err, data) {

    var template = new XlsxTemplate(data);

    var sheetNumber = 1;

    var values = {
            name: "asd",
            surname: "asd",
            people: [
                {name: "saga12", surname: 20},
                {name: "saga", surname: 22}
            ]
        };

    template.substitute(sheetNumber, values);

    var data = template.generate();
    res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(new Buffer(data, 'binary'));
    console.log("succes");
});
});

app.listen(3000, function () {
  console.log('server up and running at 8080 port');
});