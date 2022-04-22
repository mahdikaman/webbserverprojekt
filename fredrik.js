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
// POST funkar men movieTitle skrivs ut konstigt = "\"Taxi Driver\""
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

app.put('/movies', (req, res) => {
  let sql =
    'UPDATE movie SET movieTitle = ?, movieReleaseYear = ? WHERE movieId = ?'
  let params = [req.body.movieTitle, req.body.movieRelaseYear, req.body.movieId]
  connection.query(sql, params, (err, result) => {
    if (err) throw err
    res.json(result)
  })
})

app.delete('/movies', (req, res) => {
  console.log(req.body)
  let sql = 'DELETE FROM movie WHERE movieId = ?'
  connection.query(sql, [req.body.movieId], (err, result) => {
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
    (err, result) => {
      if (err) throw err
      console.log(result)
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
    (err, result) => {
      if (err) throw err
      console.log(result)
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
    (err, result) => {
      if (err) throw err
      res.json({ ok: true })
    }
  )
})
