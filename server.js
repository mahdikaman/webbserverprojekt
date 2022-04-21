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
app.listen(port, () => console.log(`App listening on port: ${port}`))

app.get('/movie', (req, res) => {
  let sql = 'SELECT * FROM movie'
  connection.query(sql, (err, res) => {
    if (err) throw err
    res.json(res)
  })
})

app.post('/movie', (req, res) => {
  let sql =
    'INSERT INTO movie (movieId, movieTitle, ,movieReleaseYear VALUES(?,?,?)'
  let params = [req.body.movieId, req.body.movieTitle, req.body.movieRelaseYear]
  connection.query(sql, params, (err, res) => {
    if (err) throw err
    res.json(res)
  })
})

app.put('/movie', (req, res) => {
  let sql =
    'UPDATE movie SET movieTitle = ?, movieReleaseYear = ? WHERE movieId = ?'
  let params = [req.body.movieTitle, req.body.movieRelaseYear, req.body.movieId]
  connection.query(sql, params, (err, res) => {
    if (err) throw err
    res.json(res)
  })
})

app.delete('/movie', (req, res) => {
  console.log(req.body)
  let sql = 'DELETE FROM movie WHERE movieId = ?'
  connection.query(sql, [req.body.movieId], (err, res) => {
    if (err) throw err
    res.end('The movie is now deleted!')
  })
})

//NoSql CRUD------------------------------------------------
app.get('/movieReview', (req, res) => {
  movie.find().toArray((err, items) => {
    if (err) throw err
    res.json({ movie: items })
  })
})

app.get('movieReview/:id', (req, res) => {
  let movieId = req.params.id
  movie.find({ id: movieId }).toArray((err, items) => {
    if (err) throw err
    res.json({ movie: items })
  })
})

app.post('/movieReview', (req, res) => {
  let movieTitle = req.body.movieTitle
  let movieReview = req.body.movieReview
  let movieRating = req.body.movieRating

  movieReview.insertOne(
    {
      movie: movieTitle,
      review: movieReview,
      rating: movieRating
    },
    (err, res) => {
      if (err) throw err
      console.log(res)
      res.json({ ok: true })
    }
  )
})

app.put('/movieReview', (req, res) => {
  let movieTitle = req.body.movieTitle
  let movieReview = req.body.movieReview
  let movieRating = req.body.movieRating
  let movieId = req.body.movieId

  movieReview.updateOne(
    { id: movieId },
    {
      $set: {
        movie: movieTitle,
        review: movieReview,
        rating: movieRating,
        id: movieId
      }
    },
    (err, res) => {
      if (err) throw err
      console.log(res)
      res.json({ ok: true })
    }
  )
})

app.delete('/movieReview', (req, res) => {
  let movieId = req.body.movieId

  movieReview.deleteOne(
    {
      id: movieId
    },
    (err, res) => {
      if (err) throw err
      res.json({ ok: true })
  })
})
