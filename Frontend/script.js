function getMovies() {
  let promise = fetch('http://localhost:1337/movie')

  return promise.then((response) => response.json())
}

// function getDirectors() {
//   let promise = fetch('http://localhost:1337/director')

//   return promise.them((response) => response.json())
// }

async function main() {
  movies = await getMovies()
  renderMovies(movies)
  console.log(movies)
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
