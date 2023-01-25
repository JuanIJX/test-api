const express = require("express");
const cors = require("cors");
//const formidable = require('express-formidable');
//const formData = require('express-form-data');
const multer = require('multer');


function wait(time) {
	return new Promise(resolve => setTimeout(resolve, time));
}

function bodyparser() {
	return async function(req, res, next){
		var data = "";
		req.body = {};
		req.on('data', chunk => data += chunk);
		req.on('end', function() {
			req.bodyraw = data;
			req.body = {};
			try {
				// Parsear tambien:
				// multipart/form-data
				// application/x-www-form-urlencoded
				req.body = JSON.parse(data);
			} catch (error) {
				try {
					for(const [key, value] of (new URLSearchParams(data)))
						req.body[key] = value;
				} catch (error) {
					req.body = { data };
				}
			}
			next();
		});
	 };
}

function cookieparser(ops={}) {
	return function(req, res, next){
		req.cookies = req.headers.hasOwnProperty("cookie") ? req.headers.cookie.split(';').reduce((res, item) => {
			const data = item.trim().split('=');
			return { ...res, [data[0]]: data[1] };
		}, {}) : {};
		next();
	 };
}

const port = 8443;
const app = express();
app.listen(port, () => {
	console.log("El servidor está inicializado en el puerto "+port);
});

app.use(cors());
app.use(cookieparser());
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
	console.log("req.originalUrl");
	console.log(req.originalUrl);
	console.log("req.headers");
	console.log(req.headers);
	console.log("req.body");
	console.log(req.body);
	console.log("req.query");
	console.log(req.query);
	console.log("req.cookies");
	console.log(req.cookies);
	console.log("req.method");
	console.log(req.method);
	console.log("---------------");

	await wait(1000);

	res.set('Content-Type', 'application/json');
	res.send({
		msg: "ok",
		time: Date.now()
	});
});
