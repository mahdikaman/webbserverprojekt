const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'rootuser',
  password: '',
  database: 'moviesProject'
})

module.exports = connection
