
const formMovie = document.querySelector('#formMovie')
const elementTitle = document.querySelector("#movieTitle");
const elementReleaseYear = document.querySelector("#movieReleaseYear");
const elementActorId = document.querySelector("#movieActorId");
const elementGenreId = document.querySelector("#movieGenreId");
const elementDirectorId = document.querySelector("#movieDirectorId");
// const overfora = document.querySelector("#skicka");

function newMovie(event) {
  event.preventDefault()
  let movieTitle = elementTitle.value;
  let movieReleaseYear = elementReleaseYear.value;
  let movieActorId = elementActorId.value;
  let movieGenreId = elementGenreId.value;
  let movieDirectorId = elementDirectorId.value;

  async function postData(url = "http://localhost:1337/movies", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors,cors, same-origin
      cache: "no-cache", // default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include,same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, follow, error
      referrerPolicy: "no-referrer", // no-referrer,client
      body: JSON.stringify({
        movieTitle: movieTitle,
        movieReleaseYear: movieReleaseYear,
        movieActorId: movieActorId,
        movieGenreId: movieGenreId,
        movieDirectorId: movieDirectorId,
      }), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  postData("http://localhost:1337/movies").then((data) => {
    console.log(data);
  });
}

formMovie.addEventListener("submit", newMovie, false);
