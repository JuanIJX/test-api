const express = require("express");
const bodyParser = require("body-parser");



const app = express();
app.listen(8080, () => {
	console.log("El servidor está inicializado en el puerto 8080");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('*', function (req, res) {
	console.log("===============");
	console.log(req.originalUrl);
	console.log(req.headers);
	console.log(req.body);
	console.log(req.query);
	console.log(req.method);
	console.log("---------------");

	res.send('Saludos desde express q tal');
});