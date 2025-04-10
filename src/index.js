const express = require("express");
const cors = require("cors");
//const formidable = require('express-formidable');
//const formData = require('express-form-data');
const multer = require('multer');
const { default: KeyB } = require("@ijx/keyb");


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

const comandos = (cadena, cmdName, args) => {
	console.log("CMD: " + cmdName);
	
	try {
		switch (cmdName) {
			case "a":
				break;
			default:
				break;
		}
	} catch (error) {
		console.log("Error en el bucle de comandos: "+error);
	}
};



const port = 8443;
const app = express();

(async () => {
	app.use(cors({
		//credentials: true,
		origin: '*'
	}));
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
		console.log("======================================================================");
		console.log("======================================================================");
		console.log("req.ip: "+req.ip.substring(req.ip.lastIndexOf(":")+1));
		console.log(`req.originalUrl: ${req.originalUrl}`);
		console.log(`req.hostname: ${req.hostname}`);
		console.log(`req.path: ${req.path}`);
		console.log(`req.protocol: ${req.protocol}`);
		console.log(`req.secure: ${req.secure}`);
		console.log(`req.xhr: ${req.xhr}`);
		console.log(`req.method: ${req.method}`);
		console.log(`req.baseUrl: "${req.baseUrl}"`);
		console.log(`req.headers:`);
		console.log(req.headers);
		console.log(`req.body:`);
		console.log(req.body);
		console.log(`req.query:`);
		console.log(req.query);
		console.log(`req.params:`);
		console.log(req.params);
		console.log(`req.cookies:`);
		console.log(req.cookies);
		console.log(`req.subdomains:`);
		console.log(req.subdomains);


		switch (req.baseUrl) {
			case "/api/v1/3":
				console.log("API v1.3");
				break;
		}




		await wait(500);

		/*res.set('Content-Type', 'application/json');
		res.cookie('token', session.token, {
				httpOnly: true,
				sameSite: 'none',
				maxAge: 30 * 24 * 3600000
			});*/
		res.send({
			msg: "ok",
			time: Date.now()
		});
	});

	const server = app.listen(port, () => {
		console.log("El servidor está inicializado en el puerto " + port);
	});

	KeyB.onClose(async () => server.close());
	KeyB.bucle(comandos);
})();