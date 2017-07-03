var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var methodOverride = require("method-override");
var app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 
app.use(methodOverride());
var router = express.Router();

require('./rutas')(app);

// Start server
app.listen(3000, function() {
	console.log("Servidor corriendo en http://localhost:3000");
});