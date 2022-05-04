const formReview = document.querySelector('#formReview')
const movieTitleData = document.querySelector('#movieName')
const reviewData = document.querySelector('#reviewInput')
const movieRatingData = document.querySelector('#addRating')

function newReview(event) {
  event.preventDefault()
  let movieTitle = movieTitleData.value
  let reviewText = reviewData.value
  let movieRating = movieRatingData.value

  alert('Your review has been added')

  async function postData(
    url = 'http://localhost:1337/movie/reviews',
    data = {}
  ) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        movie: movieTitle,
        review: reviewText,
        rating: movieRating
      })
    })

    return response.json()
  }
  postData('http://localhost:1337/movie/reviews').then((data) => {})
}

formReview.addEventListener('submit', newReview, false)
