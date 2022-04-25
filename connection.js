const mysql = require('mysql');

/* skapa din egen credentials.js med innehåll:

module.exports = {
  password: 'ditt-databas-lösenord'
}

credentials.js är i .gitignore för att undvika att pusha lösenord till github:)
*/
const credentials = require('./credentials');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'rootuser',
  password: credentials.password,
  database: 'moviesProject',
});

module.exports = connection;
