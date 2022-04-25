//fatstack påbörjade directors.
const getDirectors = () => {
  fetch('http://localhost:1337/directors')
    .then((response) => response.json())
    .then((result) => {
      console.log('Directors:', result)
      const directors = result

      directors.forEach((director) => {
        const directorDiv = document.getElementById('director-list')
        const directorsUl = document.createElement('ul')
        const directorsList = document.createElement('li')
        directorsList.innerHTML = 'Director: ' + director.directorName
        directorsUl.appendChild(directorsList)
        directorDiv.appendChild(directorsUl)
      })
    })
}
getDirectors()

// --------------------------------------------------------

function getMovies() {
  let promise = fetch('http://localhost:1337/movie')

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
