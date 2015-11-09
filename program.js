var Template = require('xlsx-template');
var fs =require('fs');
var path = require('path');
fs.readFile(path.join(__dirname,'templates','narudzbenica.xlsx'), function (err, data){
	var template = new Template(data);
	var sheetNumber = 2;
	var values = {
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
		items:[
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
	template.substitute(sheetNumber,values);
	var data1 = template.generate();
	if(err)console.log('pukla greska');
	else console.error('nema nista');
		
});