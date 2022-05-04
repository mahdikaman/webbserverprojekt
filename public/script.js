// SQL get all movies with movieTitle genreType actorName directorName streamingAppTitle movieReleaseYear
const getAllMovies = () => {
  fetch('http://localhost:1337/allmovies')
    .then((response) => response.json())
    .then((result) => {
      const allMovies = result
      console.log('Movies:', allMovies)

      allMovies.forEach((movies) => {
        const movieList = document.getElementById('movie-list')

        const movieElement = document.createElement('div')
        movieElement.className = 'card'

        const movieElementBody = document.createElement('div')
        movieElementBody.className = 'card-body'

        const movieUl = document.createElement('ul')

        const movieTitle = document.createElement('li')
        movieTitle.className = 'movieTitleStyle'

        const genreType = document.createElement('li')
        genreType.className = 'genreTypeStyle'

        const actorName = document.createElement('li')
        actorName.className = 'actorNameStyle'

        const directorName = document.createElement('li')
        directorName.className = 'directorNameStyle'

        const streamingAppTitle = document.createElement('li')
        streamingAppTitle.className = 'streamingNameStyle'

        const movieReleaseYear = document.createElement('li')
        movieReleaseYear.className = 'releaseYearStyle'

        const closeButton = document.createElement('div')
        closeButton.className = 'closeButtonStyle'

        movieTitle.innerHTML = ' ' + movies.movieTitle
        genreType.innerHTML = ' ' + movies.genreType
        actorName.innerHTML = ' ' + movies.actorName
        directorName.innerHTML = ' ' + movies.directorName
        streamingAppTitle.innerHTML = ' ' + movies.streamingAppTitle
        movieReleaseYear.innerHTML = ' ' + movies.movieReleaseYear
        closeButton.innerHTML = 'X'

        movieList.appendChild(movieElement)
        movieElement.appendChild(movieElementBody)
        movieUl.appendChild(movieTitle)
        movieUl.appendChild(genreType)
        movieUl.appendChild(actorName)
        movieUl.appendChild(directorName)
        movieUl.appendChild(streamingAppTitle)
        movieUl.appendChild(movieReleaseYear)
        movieElementBody.appendChild(movieUl)
        movieElement.appendChild(closeButton)

        const deleteMovie = (movie) => {
          return (event) => {
            event.preventDefault()
            movieElement.style.display = 'none'
            const movieToDelete = movie
            console.log('Movie to delete:', movieToDelete)
            console.log(movie.indexOf())
          }

          //FRÅGA JERRY
          // app.delete('/movies', (req, res) => {
          //   console.log(req.body)
          //   let sql = 'DELETE FROM movie WHERE movieId = ?'
          //   connection.query(sql, [req.body.movieId], (err, result) => {
          //     if (err) throw err
          //     res.end('The movie is now deleted!')
          //   })
          // })
        }

        closeButton.addEventListener('click', deleteMovie(allMovies))
      })
    })
}

// deleteTodo(todo) {
//   const todoIndex = this.listOfTodos.indexOf(todo)
//   this.listOfTodos.splice(todoIndex, 1)
// }

getAllMovies()

//<--------------------------------------------------------------------------->

// NoSQL GET ALL REVIEWS
const getAllReviews = () => {
  fetch('http://localhost:1337/movie/reviews')
    .then((response) => response.json())
    .then((result) => {
      const allReviews = result.reviews
      console.log('Reviews:', allReviews)

      allReviews.forEach((reviews) => {
        const reviewList = document.getElementById('review-list')

        const reviewElement = document.createElement('div')
        reviewElement.className = 'card'

        const reviewElementBody = document.createElement('div')
        reviewElementBody.className = 'card-body'

        const reviewUl = document.createElement('ul')

        const reviewMovie = document.createElement('li')
        reviewMovie.className = 'reviewMovieStyle'

        const reviewReview = document.createElement('li')
        reviewReview.className = 'reviewReviewStyle'

        const reviewRating = document.createElement('li')
        reviewRating.className = 'reviewRatingStyle'

        const closeButton = document.createElement('div')
        closeButton.className = 'closeButtonStyle'

        reviewMovie.innerHTML = reviews.movie
        reviewReview.innerHTML = reviews.review
        reviewRating.innerHTML = reviews.rating
        closeButton.innerHTML = 'X'

        reviewList.appendChild(reviewElement)
        reviewElement.appendChild(reviewElementBody)
        reviewUl.appendChild(reviewMovie)
        reviewUl.appendChild(reviewReview)
        reviewUl.appendChild(reviewRating)
        reviewElementBody.appendChild(reviewUl)
        reviewElement.appendChild(closeButton)

        const deleteReview = (event) => {
          event.preventDefault()
          reviewElement.style.display = 'none'
        }

        closeButton.addEventListener('click', deleteReview)
      })
    })
}
getAllReviews()

//FETCH for render out posted data on movies
const postedMovies = () => {
  fetch('http://localhost:1337/postedmovies')
    .then((response) => response.json())
    .then((result) => {
      const movies = result
      console.log('Posted Movies:', movies)

      movies.forEach((movie) => {
        const renderMovies = document.getElementById('render-movies')

        const renderMoviesElement = document.createElement('div')
        renderMoviesElement.className = 'card'

        const renderMoviesElementBody = document.createElement('div')
        renderMoviesElementBody.className = 'card-body'

        const moviesUl = document.createElement('ul')

        const movieTitle = document.createElement('li')
        movieTitle.className = 'movieTitleStyle'

        const movieReleaseYear = document.createElement('li')
        movieReleaseYear.className = 'releaseYearStyle'

        const closeButton = document.createElement('div')
        closeButton.className = 'closeButtonStyle'

        movieTitle.innerHTML = ' ' + movie.movieTitle
        movieReleaseYear.innerHTML = ' ' + movie.movieReleaseYear
        closeButton.innerHTML = 'X'

        renderMovies.appendChild(renderMoviesElement)
        renderMoviesElement.appendChild(renderMoviesElementBody)
        moviesUl.appendChild(movieTitle)
        moviesUl.appendChild(movieReleaseYear)
        renderMoviesElementBody.appendChild(moviesUl)
        renderMoviesElement.appendChild(closeButton)

        const deletePostedMovie = (event) => {
          event.preventDefault()
          renderMoviesElement.style.display = 'none'
        }

        closeButton.addEventListener('click', deletePostedMovie)
      })
    })
}
postedMovies()

function reloadPage() {
  location.reload()
}

document.addEventListener('submit', reloadPage, false)
