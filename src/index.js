const express = require("express");
const cors = require("cors");
//const formidable = require('express-formidable');
//const formData = require('express-form-data');
const multer = require('multer');


function wait(time) {
	return new Promise(resolve => setTimeout(resolve, time));
}

const port = 8443;
const app = express();
app.listen(port, () => {
	console.log("El servidor está inicializado en el puerto "+port);
});

app.use(cors());
//app.use(formData.parse());
//app.use(formidable());
//app.use(multer().array());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('*', async function (req, res) {
	console.log("===============");
	console.log(req.originalUrl);
	console.log(req.headers);
	console.log(req.body);
	console.log(req.query);
	console.log(req.method);
	console.log("---------------");

	await wait(1000);

	res.set('Content-Type', 'application/json');
	res.send({
		msg: "ok",
		time: Date.now()
	});
});
