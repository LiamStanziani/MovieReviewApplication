import { Component } from '@angular/core';
import {Movie} from "../../models/movie.model";
import {Review} from "../../models/review.model";
import {DatabaseService} from "../../services/database.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-detailpage',
  templateUrl: './detailpage.component.html',
  styleUrls: ['./detailpage.component.css']
})
export class DetailpageComponent {
  movie: Movie = new Movie("", "", "", "");
  reviews: Review[] = [];
  averageRating: number = 0;
  isTrue: boolean = false;

  userName: any = "Guest";

  constructor(private database: DatabaseService, private ar: ActivatedRoute) {
  }
  init = function(){
    console.log("Page Loaded")
  }

  public ngOnInit() {
    const id: any = this.ar.snapshot.paramMap.get('id');
    if (localStorage.getItem("username") == "") {
      this.userName = "Guest";
    }
    else {
      this.userName = localStorage.getItem("username");
    }
    this.database.selectMovie(id)
      .then((data) => {
        this.movie = data;
      })
      .catch((err) => {
        console.log("Error in select:  book not found: " + err.message);
      })
    this.database.selectAllReviews()
      .then((data)=>{
        this.reviews = data;
        console.log(this.reviews);
      })
      .catch((err)=>{
        console.log("Error in select all" + err.message);
      });
  }

  displayRating_Load() {
    this.isTrue = false;
    this.averageRating = 0;
    let counter = 0;
    for (let i = 0; i < this.reviews.length; i++) {
      if (this.reviews[i].movieId == this.movie.id) {
        this.averageRating += this.reviews[i].reviewRating;
        counter += 1;
      }
    }
    this.averageRating = this.averageRating / counter;
    if (this.averageRating >= 0) {
      this.isTrue = true;
    } else {
      this.averageRating = 0;
      this.isTrue = true;
    }
  }
}
