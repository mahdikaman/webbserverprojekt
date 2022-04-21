const mysql = require('mysql')
exports.connection = mysql.createConnection({
  host: 'localhost',
  user: 'rootuser',
  password: '',
  database: 'moviesProject'
})
