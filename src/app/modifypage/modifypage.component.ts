import { Component } from '@angular/core';
import {Movie} from "../../models/movie.model";
import {DatabaseService} from "../../services/database.service";
import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";

@Component({
  selector: 'app-modifypage',
  templateUrl: './modifypage.component.html',
  styleUrls: ['./modifypage.component.css']
})
export class ModifypageComponent {
  movie: Movie = new Movie("", "", "", "");

  constructor(private database: DatabaseService, private ar: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const id: any = this.ar.snapshot.paramMap.get('id');
    this.database.selectMovie(id)
      .then((data) => {
        this.movie = data;
      })
      .catch((err) => {
        console.log("Error in select: movie not found: " + err.message);
      })
  }

  btnUpdate_click() {
    this.database.updateMovie(this.movie)
      .then((data) => {
        alert("Record updated successfully");
        this.router.navigate(['/list']);
      })
      .catch((err) => {
        alert("Error in update");
      })
  }
}
