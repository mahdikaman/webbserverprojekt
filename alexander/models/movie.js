const mongoose = require('mongoose')

const movieSchema = mongoose.Schema(
  {
    movieId: String,
    movieTitle: String,
    movieReleaseYear: String,
    movieGenreId: String,
    movieDirectorId: String,
    actorId: String
  },
  {
    timestamps: true
  }
)

const Movie = mongoose.model('Movie', movieSchema)
module.exports = Movie
