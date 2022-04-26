const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const connection = require('./connection')
const colors = require('colors')
const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
let db
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(express.static('public'))
const port = 1337
app.listen(port, () =>
  console.log(colors.rainbow(`App listening on port: ${port}`))
)

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

//SQL/mySql
//GET
app.get('/movies', (req, res) => {
  let sql = 'SELECT * FROM movie'
  connection.query(sql, (err, results) => {
    if (err) throw err
    res.json(results)
  })
})

//GET ALL MOVIES WITH CHOOSEN TABLES
app.get('/allmovies', (req, res) => {
  let sql =
    'SELECT movie.movieTitle, genre.genreType,actor.actorName,director.directorName,streamingApp.streamingAppTitle, movieReleaseYear FROM genre INNER JOIN movie ON genre.genreId = movie.movieGenreId INNER JOIN actorMovie ON movie.movieId = actorMovie.actorMovieMId INNER JOIN actor ON actorMovie.actorMovieAId = actor.actorId INNER JOIN director ON movie.movieDirectorId = director.directorId INNER JOIN streamingAppMovie ON movie.movieId = streamingAppMovie.streamingAppMovieMId INNER JOIN streamingApp ON streamingApp.streamingAppId = streamingAppMovie.streamingAppMovieSId'
  connection.query(sql, (err, results) => {
    if (err) throw err
    res.json(results)
  })
})

// POST
app.post('/movies', (req, res) => {
  let sql =
    'INSERT INTO movie (movieId, movieTitle, movieReleaseYear, movieDirectorId, movieGenreId) VALUES(?,?,?,?,?)'
  let params = [
    req.body.movieId,
    req.body.movieTitle,
    req.body.movieReleaseYear,
    req.body.movieDirectorId,
    req.body.movieGenreId
  ]
  connection.query(sql, params, (err, results) => {
    if (err) throw err
    res.send('Movie added')
  })
})

//PUT
app.put('/movies', (req, res) => {
  let sql =
    'UPDATE movie SET movieTitle = ?, movieReleaseYear = ?, movieDirectorId = ?, movieGenreId = ? WHERE movieId = ?'
  let params = [
    req.body.movieTitle,
    req.body.movieReleaseYear,
    req.body.movieDirectorId,
    req.body.movieGenreId,
    req.body.movieId
  ]
  connection.query(sql, params, (err, results) => {
    if (err) throw err
    res.json(results)
  })
})

//DELETE
app.delete('/movies', (req, res) => {
  console.log(req.body)
  let sql = 'DELETE FROM movie WHERE movieId = ?'
  connection.query(sql, [req.body.movieId], (err, result) => {
    if (err) throw err
    res.end('The movie is now deleted!')
  })
})

//NoSql/mongoDb
//GET
app.get('/movieReviews', (req, res) => {
  reviews.find().toArray((err, items) => {
    if (err) throw err
    res.json({ reviews: items })
  })
})

//POST
app.post('/movieReviews', (req, res) => {
  let movieId = req.body.id
  let movieTitle = req.body.movie
  let movieReview = req.body.review
  let movieRating = req.body.rating

  reviews.insertOne(
    {
      id: parseInt(movieId),
      movie: movieTitle,
      review: movieReview,
      rating: parseInt(movieRating)
    },
    (err, result) => {
      if (err) throw err
      console.log(result)
      res.json({ ok: true })
    }
  )
})

//PUT
app.put('/movieReviews', (req, res) => {
  let movieId = req.body.id
  let movieTitle = req.body.movie
  let movieReview = req.body.review
  let movieRating = req.body.rating
  console.log(movieId, movieTitle, movieReview)
  reviews.updateOne(
    { id: parseInt(movieId) },
    {
      $set: {
        movie: movieTitle,
        review: movieReview,
        rating: parseInt(movieRating)
      }
    },
    (err, result) => {
      if (err) throw err
      res.json({ ok: true })
    }
  )
})

//DELETE
app.delete('/movieReviews', (req, res) => {
  let movieId = req.body.id

  reviews.deleteOne(
    {
      id: parseInt(movieId)
    },
    (err, result) => {
      if (err) throw err
      res.json({ ok: true })
    }
  )
})
