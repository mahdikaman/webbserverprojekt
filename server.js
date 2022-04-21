// Sql/mySql
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const connection = require('./connection')
const { MongoErrorLabel } = require('mongodb')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(express.static('public'))
const port = 1337

app.listen(port, () => console.log(`App listening on port: ${port}`))

// NoSql/mongoDb
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
