// SQL get all movies with movieTitle genreType actorName directorName streamingAppTitle movieReleaseYear
const getAllMovies = () => {
  fetch('http://localhost:1337/allmovies')
    .then((response) => response.json())
    .then((result) => {
      console.log('All movies: ', result)
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

// NoSQL
const getAllReviews = () => {
  fetch('http://localhost:1337/movieReviews')
    .then((response) => response.json())
    .then((result) => {
      console.log('All reviews: ', result)
    })
}
getAllReviews()

// -------------------------------------

// const getDirectors = () => {
//   fetch('http://localhost:1337/director')
//     .then((response) => response.json())
//     .then((result) => {
//       console.log('Directors:', result)
//       const directors = result

//       directors.forEach((director) => {
//         const directorList = document.getElementById('director-list')

//         const directorElement = document.createElement('div')
//         directorElement.className = 'card'

//         const directorElementBody = document.createElement('div')
//         directorElementBody.className = 'card-body'

//         const directorName = document.createElement('div')
//         directorName.className = 'title'
//         directorName.innerHTML = 'Director: ' + director.directorName

//         directorList.appendChild(directorElement)
//         directorElement.appendChild(directorElementBody)
//         directorElementBody.appendChild(directorName)
//       })
//     })
// }
// getDirectors()

// --------------------------------------------------------

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

// const getAllMovies = () => {
//   fetch('http://localhost:1337/allmovies')
//     .then((response) => response.json())
//     .then((result) => {
//       console.log('All movies: ', result)
//       const allMovies = result

//       allMovies.forEach((movies) => {
//         const movieList = document.getElementById('movie-list')

//         const movieElement = document.createElement('div')
//         movieElement.className = 'card'

//         const movieElementBody = document.createElement('div')
//         movieElementBody.className = 'card-body'

//         const movieUl = document.createElement('ul')
//         const movieTitle = document.createElement('li')
//         movieTitle.style.color = '#3195ff'
//         const genreType = document.createElement('li')
//         const actorName = document.createElement('li')
//         const directorName = document.createElement('li')
//         const streamingAppTitle = document.createElement('li')
//         const movieReleaseYear = document.createElement('li')

//         movieTitle.innerHTML = 'Title: ' + movies.movieTitle
//         genreType.innerHTML = 'Genre: ' + movies.genreType
//         actorName.innerHTML = 'Actor: ' + movies.actorName
//         directorName.innerHTML = 'Director: ' + movies.directorName
//         streamingAppTitle.innerHTML = 'Stream at: ' + movies.streamingAppTitle
//         movieReleaseYear.innerHTML = 'Release: ' + movies.movieReleaseYear

//         movieList.appendChild(movieElement)
//         movieElement.appendChild(movieElementBody)
//         movieUl.appendChild(movieTitle)
//         movieUl.appendChild(genreType)
//         movieUl.appendChild(actorName)
//         movieUl.appendChild(directorName)
//         movieUl.appendChild(streamingAppTitle)
//         movieUl.appendChild(movieReleaseYear)
//         movieElementBody.appendChild(movieUl)
//       })
//     })
// }
// getAllMovies()
