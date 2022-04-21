const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const connection = require('./connection')
const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
let db
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(express.static('public'))
const port = 1337

app.listen(port, () => console.log(`App listening on port: ${port}`))

mongo.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    db = client.db('movieReviews')
    reviews = db.collection('movieReview')
  }
)

// Sql/mySql anrop
app.get('/movie', (req, res) => {
  let sql = 'SELECT * FROM movie'
  connection.query(sql, (err, results, fields) => {
    if (err) throw err
    res.json(results)
  })
})

// NoSql/mongoDb anrop
app.get('/reviews', (req, res) => {
  reviews.find().toArray((err, items) => {
    if (err) throw err
    res.json({ reviews: items })
  })
})
