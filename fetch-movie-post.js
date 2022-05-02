const formMovie = document.querySelector('#formMovie')
const elementTitle = document.querySelector('#movieTitle')
const elementReleaseYear = document.querySelector('#movieReleaseYear')
const elementGenreId = document.querySelector('#movieGenreId')
const elementDirectorId = document.querySelector('#movieDirectorId')
const elementActorId = document.querySelector('#actorId')


function newMovie(event) {
  event.preventDefault()
  let movieTitle = elementTitle.value
  let movieReleaseYear = elementReleaseYear.value
  let movieGenreId = elementGenreId.value
  let movieDirectorId = elementDirectorId.value
  let actorId = elementActorId.value

  elementTitle.value = ''
  elementReleaseYear.value = ''
  elementGenreId.value = ''
  elementDirectorId.value = ''
  elementActorId.value = ''

  alert('Your movie has been added')



  async function postData(url = 'http://localhost:1337/movies', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors,cors, same-origin
      cache: 'no-cache', // default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include,same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, follow, error
      referrerPolicy: 'no-referrer', // no-referrer,client
      body: JSON.stringify({
        movieTitle: movieTitle,
        movieReleaseYear: movieReleaseYear,
        movieGenreId: movieGenreId,
        movieDirectorId: movieDirectorId,
        actorId: actorId
      }) // body data type must match "Content-Type" header
    })
    return response.json() // parses JSON response into native JavaScript objects
  }
  postData('http://localhost:1337/movies').then((data) => {
    console.log(data)
  })
}

formMovie.addEventListener('submit', newMovie, false)
