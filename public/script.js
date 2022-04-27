// SQL get all movies with movieTitle genreType actorName directorName streamingAppTitle movieReleaseYear
const getAllMovies = () => {
  fetch('http://localhost:1337/allmovies')
    .then((response) => response.json())
    .then((result) => {
      const allMovies = result

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

        movieTitle.innerHTML = ' ' + movies.movieTitle
        genreType.innerHTML = ' ' + movies.genreType
        actorName.innerHTML = ' ' + movies.actorName
        directorName.innerHTML = ' ' + movies.directorName
        streamingAppTitle.innerHTML = ' ' + movies.streamingAppTitle
        movieReleaseYear.innerHTML = ' ' + movies.movieReleaseYear

        movieList.appendChild(movieElement)
        movieElement.appendChild(movieElementBody)
        movieUl.appendChild(movieTitle)
        movieUl.appendChild(genreType)
        movieUl.appendChild(actorName)
        movieUl.appendChild(directorName)
        movieUl.appendChild(streamingAppTitle)
        movieUl.appendChild(movieReleaseYear)
        movieElementBody.appendChild(movieUl)
      })
    })
}
getAllMovies()

// -------------------------------

// NoSQL GET ALL REVIEWS
const getAllReviews = () => {
  fetch('http://localhost:1337/movieReviews')
    .then((response) => response.json())
    .then((result) => {
      const allReviews = result.reviews

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

        reviewMovie.innerHTML = reviews.movie
        reviewReview.innerHTML = reviews.review
        reviewRating.innerHTML = reviews.rating

        reviewList.appendChild(reviewElement)
        reviewElement.appendChild(reviewElementBody)
        reviewUl.appendChild(reviewMovie)
        reviewUl.appendChild(reviewReview)
        reviewUl.appendChild(reviewRating)
        reviewElementBody.appendChild(reviewUl)
      })
    })
}
getAllReviews()

//SHOW LIVETIME ON HTML
const time = () => {
  const today = new Date()
  const day = today.getDay()
  const daylist = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday ',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  const date =
    today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  const dateTime = date + ' ' + time

  document.getElementById('displayDateTime').innerHTML =
    dateTime + ' ' + daylist[day]
}
setInterval(time, 1000)
