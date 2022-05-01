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


//Get för alla filmer
app.get('/movies', (req, res) => {
  let sql = 'SELECT * FROM movie'
  connection.query(sql, (err, result) => {
    if (err) throw err
    res.json(result)
  })
})


//Get för alla filmer kopplade till skådespelare
app.get('/movies/actors', (req, res) => {
  let sql = 'SELECT movie.movieTitle,actor.actorName FROM movie INNER JOIN actorMovie ON movie.movieId = actorMovie.actorMovieMId INNER JOIN actor ON actorMovie.actorMovieAId = actor.actorId'
  connection.query(sql, (err, result) => {
    if (err) throw err
    res.json(result)
  })
})

//Returnerar skådespelare och genre där det matchar.
app.get('/movies/actorsgenre', (req, res) => {
  let sql = 'SELECT actor.actorName, genre.genreType FROM genre INNER JOIN actorMovie ON genre.genreId = actorMovie.actorMovieAId INNER JOIN actor ON actorMovie.actorMovieAId = actor.actorId'
  connection.query(sql, (err, result) => {
    if (err) throw err
    res.json(result)
  })
})


// Visar vilken film som visas på vilken streamingapp
app.get('/movies/streamingapp', (req, res) => {
  let sql = 'SELECT streamingApp.streamingAppTitle, movie.movieTitle FROM movie INNER JOIN streamingAppMovie ON movie.movieId = streamingAppMovie.streamingAppMovieMId INNER JOIN streamingApp ON streamingAppMovie.streamingAppMovieSId = streamingApp.streamingAppId'
  connection.query(sql, (err, result) => {
    if (err) throw err
    res.json(result)
  })
})

// Returnerar vem som har regisserat filmen
app.get('/movies/director', (req, res) => {
  let sql = 'SELECT movie.movieTitle, director.directorName FROM movie INNER JOIN director ON movie.movieDirectorId = director.directorId'
  connection.query(sql, (err, result) => {
    if (err) throw err
    res.json(result)
  })
})



//Get för antal filmer
app.get('/movies/count', (req, res) => {
  let sql = 'SELECT COUNT (movieId) AS movieAmount FROM movie'
  connection.query(sql, (err, result) => {
    if (err) throw err
    res.json(result)
  })
})

//Get för antal skådespelare
app.get('/movies/countactors', (req, res) => {
  let sql = 'SELECT COUNT (actorId) AS actorAmount FROM actor'
  connection.query(sql, (err, result) => {
    if (err) throw err
    res.json(result)
  })
})


//Post för filmer
app.post('/movies', (req, res) => {
  let sql ='INSERT INTO movie (movieId, movieTitle, ,movieReleaseYear VALUES(?,?,?)'
  let params = [req.body.movieId, req.body.movieTitle, req.body.movieRelaseYear]
  connection.query(sql, params, (err, result) => {
    if (err) throw err
    res.json(result)
  })
})


//Put för filmer
app.put('/movies', (req, res) => {
  let sql =
    'UPDATE movie SET movieTitle = ?, movieReleaseYear = ? WHERE movieId = ?'
  let params = [req.body.movieTitle, req.body.movieRelaseYear, req.body.movieId]
  connection.query(sql, params, (err, result) => {
    if (err) throw err
    res.json(result)
  })
})

//Delete för filmer
app.delete('/movies', (req, res) => {
  console.log(req.body)
  let sql = 'DELETE FROM movie WHERE movieId = ?'
  connection.query(sql, [req.body.movieId], (err, result) => {
    if (err) throw err
    res.end('The movie is now deleted!')
  })
})


//Get för alla skådespelare
app.get('/actors', (req, res) => {
  let sql = 'SELECT * FROM actor'
  connection.query(sql, (err, result) => {
    if (err) throw err
    res.json(result)
  })
})


//Post för skådespelare
app.post('/actors', (req, res) => {
  let sql = 'INSERT INTO movie (actorId, actorName VALUES(?,?)'
  let params = [req.body.actorId, req.body.actorName]
  connection.query(sql, params, (err, result) => {
    if (err) throw err
    res.json(result)
  })
})


//Put för skådespelare
app.put('/actors', (req, res) => {
  let sql = 'UPDATE actor SET actorName = ? = ? WHERE actorId = ?'
  let params = [req.body.movieTitle, req.body.movieRelaseYear, req.body.movieId]
  connection.query(sql, params, (err, result) => {
    if (err) throw err
    res.json(result)
  })
})

//Delete för skådespelare
app.delete('/actors', (req, res) => {
  console.log(req.body)
  let sql = 'DELETE FROM actor WHERE actorId = ?'
  connection.query(sql, [req.body.actorId], (err, result) => {
    if (err) throw err
    res.end('The actor is now deleted!')
  })
})


//NoSql CRUD------------------------------------------------

//Get för alla filmrecensioner
app.get('/movieReviews', (req, res) => {
  reviews.find().toArray((err, items) => {
    if (err) throw err
    res.json({ review: items })
  })
})

// Get för filmtitel
app.get('/movieReviews/:title', (req, res) => {
  let movieTitle = req.params.title
  reviews.find({ rating: movieTitle }).toArray((err, items) => {
      if (err) throw err
      res.json({ reviews: items })
  })
})

// Lägga till ny filmrecension
app.post('/movieReviews', (req, res) => {
  let movieTitle = req.body.movieTitle
  let movieReview = req.body.movieReview
  let movieRating = req.body.movieRating

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

// Uppdatera filmrecension
app.put('/movieReviews', (req, res) => {
  let movieTitle = req.body.movieTitle
  let movieReview = req.body.movieReview
  let movieRating = req.body.movieRating


  reviews.updateOne(
      { movie: movieTitle },
      {
          $set: {
          movie: movieTitle,
          review: movieReview,
          rating: parseInt(movieRating)

          }
      }, (err, result) => {
          if (err) throw err
          res.json({ ok: true })
      })
})


//Ta bort filmrecension
app.delete('/movieReviews', (req, res) => {
  let movieTitle = req.body.movieTitle

  reviews.deleteOne(
    {
      movie: movieTitle
    },
    (err, result) => {
      if (err) throw err
      res.json({ ok: true })
  })
})


// //Räknar hur många reviews som finns totalt med count
// db.movieReview.find( {} ).count()

// //Räknar antal reviews som har rating 5 eller mer.
// db.movieReview.countDocuments({ rating: { $gte: 5 } })

// //Räknar antal reviews som har rating 4 eller mindre.
// db.movieReview.countDocuments ({ rating: {$lte: 4} })
