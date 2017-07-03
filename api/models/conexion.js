var mysql = require('mysql');

var conexion = mysql.createConnection({
  host: "localhost",
  user: "jodevelo_admin",
  password: "Sportage2016",
  database : 'jodevelo_planLealtad'
});

module.exports = conexion;