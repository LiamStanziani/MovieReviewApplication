import {Component, ViewChild} from '@angular/core';
import {DatabaseService} from "../../services/database.service";
import {Movie} from "../../models/movie.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-addpage',
  templateUrl: './addpage.component.html',
  styleUrls: ['./addpage.component.css']
})
export class AddpageComponent {
  movie: Movie = new Movie("", "", "", "");
  numOfReviews: number = 0;

  constructor(private database: DatabaseService, private router: Router) {
  }

  btnAdd_click() {
    this.database.insertMovie(this.movie)
      .then((data)=>{
        alert("Record added successfully");
        this.router.navigate(['/list']);
        })
        .catch((err)=>{
          alert("Error in insert");
        });
  }
}
