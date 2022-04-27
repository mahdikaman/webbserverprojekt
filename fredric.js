const bodyParser = require('body-parser')
const connection = require('./connection')
const cors = require('cors')
const express = require('express')
const hostname = 'localhost'
const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const port = 1337

const app = express()
let db

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(express.static('public'))

mongo.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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

app.listen(port, () => console.log(`http://${hostname}:${port}/`))

// ------------- GET MOVIES -------------
app.get('/movies', (req, res) => {
  let sql = 'SELECT * FROM movie'
  connection.query(sql, (err, result) => {
    if (err) throw err
    res.json(result)
  })
})

// ------------- GET DIRECTORS -------------
app.get('/directors', (req, res) => {
  let sql = 'SELECT * FROM director'
  connection.query(sql, (err, result) => {
    if (err) throw err
    res.json(result)
  })
})

// ------------- POST MOVIE -------------
app.post('/movie', (req, res) => {
  let sql =
    'INSERT INTO movie (movieId, movieTitle, movieReleaseYear, movieDirectorId, movieGenreId) VALUES(?,?,?,?,?)'

  let params = [
    req.body.movieId,
    req.body.movieTitle,
    req.body.movieReleaseYear,
    req.body.movieDirectorId,
    req.body.movieGenreId,
  ]

  connection.query(sql, params, (err, result) => {
    if (err) throw err
    // res.json(result)
    res.send('Movie added!')
  })
})

// ------------- PUT MOVIE -------------
app.put('/movie', (req, res) => {
  let sql =
    'UPDATE movie SET movieTitle = ?, movieReleaseYear = ?, movieDirectorId = ?, movieGenreId = ? WHERE movieId = ?'

  let params = [
    req.body.movieTitle,
    req.body.movieReleaseYear,
    req.body.movieDirectorId,
    req.body.movieGenreId,
    req.body.movieId,
  ]

  connection.query(sql, params, (err, results) => {
    if (err) throw err
    // res.json(results)
    res.send('Movie changed!')
  })
})

// ------------- DELETE MOVIE -------------
app.delete('/movie', (req, res) => {
  console.log(req.body)
  let sql = 'DELETE FROM movie WHERE movieId = ?'
  connection.query(sql, [req.body.movieId], (err, result) => {
    if (err) throw err
    res.end('Movie deleted!')
  })
})

// -----------------------  NoSQL CRUD  ---------------------------------

app.get('/movieReview', (req, res) => {
  reviews.find().toArray((err, items) => {
    if (err) throw err
    res.json({ reviews: items })
  })
})

app.get('/movieReview/:movie', (req, res) => {
  let movieId = req.params.movie
  reviews.find({ movie: movieId }).toArray((err, items) => {
    if (err) throw err
    res.json({ reviews: items })
  })
})

app.post('/movieReview', (req, res) => {
  let movieTitle = req.body.movieTitle
  let movieReview = req.body.movieReview
  let movieRating = req.body.movieRating

  reviews.insertOne(
    {
      movie: movieTitle,
      review: movieReview,
      rating: movieRating,
    },
    (err, result) => {
      if (err) throw err
      console.log(result)
      res.json({ ok: true })
    }
  )
})

// -----------------------  CHECK PUT & DELETE  -----------------------

app.put('/movieReview', (req, res) => {
  let movieTitle = req.body.movieTitle
  let movieReview = req.body.movieReview
  let movieRating = req.body.movieRating
  let movieId = req.body.movieId

  reviews.updateOne(
    { _id: movieId },
    {
      $set: {
        movie: movieTitle,
        review: movieReview,
        rating: movieRating,
        id: movieId,
      },
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

  reviews.deleteOne(
    {
      id: movieId,
    },
    (err, result) => {
      if (err) throw err
      res.json({ ok: true })
    }
  )
})

// function getMovies() {
//   let promise = fetch('http://localhost:1337/movies')

//   return promise.then((response) => response.json())
// }

// async function main() {
//   movies = await getMovies()
//   renderMovies(movies)
//   console.log('Movies:', movies)
// }

// main()

// function renderMovies(movies) {
//   const movieList = document.querySelector('#movie-list')

//   movieList.innerHTML = ''

//   for (const movie of movies) {
//     const movieElement = document.createElement('div')
//     movieElement.className = 'card'

//     const movieElementBody = document.createElement('div')
//     movieElementBody.className = 'card-body'

//     const movieTitle = document.createElement('div')
//     movieTitle.className = 'title'

//     const movieYear = document.createElement('p')

//     movieTitle.innerText = movie.movieTitle
//     movieYear.innerText = movie.movieReleaseYear

//     movieList.appendChild(movieElement)
//     movieElement.appendChild(movieElementBody)
//     movieElementBody.appendChild(movieTitle)
//     movieElementBody.appendChild(movieYear)
//   }
// }
