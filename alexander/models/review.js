const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema(
  {
    movieId: {
      type: mongoose.Types.ObjectId,
      ref: 'Movie'
    },
    movie: String,
    review: String,
    rating: Number
  },
  {
    timestamps: true
  }
)

reviewSchema.pre(/^find/, function (next) {
  this.populate('movieId')
  next()
})

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review
