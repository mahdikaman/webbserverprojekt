// SQL get all movies with movieTitle genreType actorName directorName streamingAppTitle movieReleaseYear
const getAllMovies = () => {
  fetch('http://localhost:1337/allmovies')
    .then((response) => response.json())
    .then((result) => {
      console.log('All movies: ', result)
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

const getDirectors = () => {
  fetch('http://localhost:1337/directors')
    .then((response) => response.json())
    .then((result) => {
      console.log('Directors:', result)
      const directors = result

      directors.forEach((director) => {
        const directorList = document.getElementById('director-list')

        const directorElement = document.createElement('div')
        directorElement.className = 'card'

        const directorElementBody = document.createElement('div')
        directorElementBody.className = 'card-body'

        const directorName = document.createElement('div')
        directorName.className = 'title'
        directorName.innerHTML = 'Director: ' + director.directorName

        directorList.appendChild(directorElement)
        directorElement.appendChild(directorElementBody)
        directorElementBody.appendChild(directorName)
      })
    })
}
getDirectors()

// --------------------------------------------------------

function getMovies() {
  let promise = fetch('http://localhost:1337/movies')

  return promise.then((response) => response.json())
}

async function main() {
  movies = await getMovies()
  renderMovies(movies)
  console.log('Movies:', movies)
}

main()

function renderMovies(movies) {
  const movieList = document.querySelector('#movie-list')

  movieList.innerHTML = ''

  for (const movie of movies) {
    const movieElement = document.createElement('div')
    movieElement.className = 'card'

    const movieElementBody = document.createElement('div')
    movieElementBody.className = 'card-body'

    const movieTitle = document.createElement('div')
    movieTitle.className = 'title'

    const movieYear = document.createElement('p')

    movieTitle.innerText = movie.movieTitle
    movieYear.innerText = movie.movieReleaseYear

    movieList.appendChild(movieElement)
    movieElement.appendChild(movieElementBody)
    movieElementBody.appendChild(movieTitle)
    movieElementBody.appendChild(movieYear)
  }
}
