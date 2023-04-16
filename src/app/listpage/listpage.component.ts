import { Component } from '@angular/core';
import {DatabaseService} from "../../services/database.service";
import {Movie} from "../../models/movie.model";
import {Router} from "@angular/router";
import {Review} from "../../models/review.model";

@Component({
  selector: 'app-listpage',
  templateUrl: './listpage.component.html',
  styleUrls: ['./listpage.component.css']
})
export class ListpageComponent {
  movies: Movie[] = [];
  reviews: Review[] = [];

  //averageRating: number = 0;
  averageRating: number[] = [this.reviews.length];

  constructor(private database: DatabaseService,
              private router: Router
  ) {
  }

  ngOnInit(){
    this.database.selectAllMovies()
      .then((data)=>{
        this.movies = data;
        console.log(this.movies);
      })
      .catch((err)=>{
        console.log("Error in select all" + err.message);
      });
    this.database.selectAllReviews()
      .then((data)=>{
        this.reviews = data;
        console.log(this.reviews);
        // FOR GIVING AVERAGE REVIEW TO LIST, NOT WORKING
        for (let i = 0; i < this.movies.length; i++) {
          if (this.reviews[i].movieId == this.movies[i].id) {
            this.averageRating[i] += this.reviews[i].reviewRating;
            this.averageRating[i] = this.averageRating[i] / this.averageRating.length
          }
        }
      })
      .catch((err)=>{
        console.log("Error in select all" + err.message);
      });
  }

  btnDisplay_click(item:Movie) {
    this.router.navigate([`/detail/${item.id}`]);
  }

  btnModify_click(item:Movie){
    this.router.navigate([`/modify/${item.id}`]);
  }
  btnAddReview_click(item:Movie){
    this.router.navigate([`/addreview/${item.id}`])
  }
   btnDelete_click(item: Movie, id: number){
    this.database.deleteMovie(item)
      .then((data)=>{
        console.log("Record deleted successfully");
        this.ngOnInit();
      })
      .catch((err)=>{
        console.log("Error in delete: " + err.message)
      })
     for (var i = 0; i < this.reviews.length; i++) {
       if (this.reviews[i].movieId == id) {
         this.database.deleteReview(this.reviews[i])
           .then((data)=>{
             console.log("Record deleted successfully");
             this.ngOnInit();
           })
           .catch((err)=>{
             console.log("Error in delete: " + err.message)
           })
       }
     }
  }
}
