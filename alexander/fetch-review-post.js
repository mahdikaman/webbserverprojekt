const formReview = document.getElementById('form-review')
console.log('formReview', formReview)
const formReview1 = document.getElementById('form-review')

console.log('formReview1', formReview1)
let MovieName
let Review
let movieRating
formReview1.addEventListener(
  'submit',
  function (e) {
    e.preventDefault()
    newReview()
  },
  false
)

function newReview() {
  console.log('here')
  async function postData(
    url = 'http://localhost:1337/movieReviews',
    data = {}
  ) {
    MovieName = document.getElementById('MovieName')
    Review = document.getElementById('Review')
    movieRating = document.getElementById('movie-rating')

    console.log('MovieName', MovieName)

    console.log('Review', Review)

    console.log('movieRating', movieRating)
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
        movieId: MovieName.value,
        movieReview: Review.value,
        movieRating: movieRating.value
      }) // body data type must match "Content-Type" header
    })
    return response.json() // parses JSON response into native JavaScript objects
  }

  postData('http://localhost:1337/movieReviews').then((data) => {
    console.log(data)
    alert('review added successfully!')
    MovieName.value = ''
    Review.value = ''
    movieRating.value = ''
  })
}

formMovie.addEventListener(
  'submit',
  function () {
    console.log('heereeeeeeeeee')
  },
  false
)
