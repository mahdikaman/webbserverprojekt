// SQL get all movies with movieTitle genreType actorName directorName streamingAppTitle movieReleaseYear
const getAllMovies = () => {
  fetch('http://localhost:1337/allmovies')
    .then((response) => response.json())
    .then((result) => {
      const allMovies = result
      console.log('All movies:', allMovies)

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

// NoSQL
const getAllReviews = () => {
  fetch('http://localhost:1337/movieReviews')
    .then((response) => response.json())
    .then((result) => {
      const allReviews = result.reviews

      allReviews.forEach((reviews) => {
        const movieName = document.getElementById('harry-potta')
        movieName.innerHTML = reviews.movie
      })
    })
}
getAllReviews()
