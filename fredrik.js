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
// Skicka med id:n så att man har möjlighet att uppdatera FK i en tabell t ex movieGenreId i movie-tabellen. När id är PK är det den ni använder för att veta vilken rad ni ska uppdatera i databasen. Man skulle kunna göra som med böcker att man gör ett unikt index av ISBN (då något liknande i en annan tabell) och det är den kolumnen som då används för att komma åt rätt rad och t ex uppdatera eller ta bort den. Men har man ingen annan tydlig kolumn använder man id:t.

//Sql CRUD------------------------
//GET funkar
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
    'SELECT movie.movieTitle, genre.genreType,actor.actorName,director.directorName,streamingApp.streamingAppTitle FROM genre INNER JOIN movie ON genre.genreId = movie.movieGenreId INNER JOIN actorMovie ON movie.movieId = actorMovie.actorMovieMId INNER JOIN actor ON actorMovie.actorMovieAId = actor.actorId INNER JOIN director ON movie.movieDirectorId = director.directorId INNER JOIN streamingAppMovie ON movie.movieId = streamingAppMovie.streamingAppMovieMId INNER JOIN streamingApp ON streamingApp.streamingAppId = streamingAppMovie.streamingAppMovieSId'
  connection.query(sql, (err, results) => {
    if (err) throw err
    res.json(results)
  })
})

// POST funkar
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
//PUT funkar
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
//DELETE funkar
app.delete('/movies', (req, res) => {
  console.log(req.body)
  let sql = 'DELETE FROM movie WHERE movieId = ?'
  connection.query(sql, [req.body.movieId], (err, result) => {
    if (err) throw err
    res.end('The movie is now deleted!')
  })
})

// NoSql CRUD------------------------------------------------

//GET FUNKAR
app.get('/movieReviews', (req, res) => {
  reviews.find().toArray((err, items) => {
    if (err) throw err
    res.json({ reviews: items })
  })
})

//POST funkar
app.post('/movieReviews', (req, res) => {
  let movieTitle = req.body.movie
  let movieReview = req.body.review
  let movieRating = req.body.rating

  reviews.insertOne(
    {
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

// PUT funkar med id i url men inte i textfält för insomnia
//SKAPA ID
app.put('/movieReviews', (req, res) => {
  let movieTitle = req.body.movie
  let movieReview = req.body.review
  let movieRating = req.body.rating
  let movieTitleNew = req.body.movienew

  reviews.updateOne(
    { movieTitle: movieTitle },
    {
      $set: {
        movie: movieTitleNew,
        review: movieReview,
        rating: parseInt(movieRating)
      }
    },
    (err, result) => {
      if (err) throw err
      // console.log(result)
      res.json({ ok: true })
    }
  )
})
//DELETE funkar men inte med id
app.delete('/movieReviews', (req, res) => {
  let movieTitle = req.body.movieTitle

  reviews.deleteOne(
    {
      movie: movieTitle
    },
    (err, result) => {
      if (err) throw err
      res.json({ ok: true })
    }
  )
})
