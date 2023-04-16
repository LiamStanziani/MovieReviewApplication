export class Review {
  id: number = -1;
  movieId: number = -1;
  reviewText: string = "";
  reviewRating: number = 0;

  constructor(movieId: number, reviewText: string, reviewRating: number) {
    this.movieId = movieId;
    this.reviewText = reviewText;
    this.reviewRating = reviewRating;
  }
}
