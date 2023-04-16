import { Component } from '@angular/core';
import {DatabaseService} from "../../services/database.service";
import {Review} from "../../models/review.model";
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-addreviewpage',
  templateUrl: './addreviewpage.component.html',
  styleUrls: ['./addreviewpage.component.css']
})
export class AddreviewpageComponent {
  mId: any = this.ar.snapshot.paramMap.get('id');
  review: Review = new Review(this.mId, "", 0);

  constructor(private database: DatabaseService,
              private router: Router, private ar: ActivatedRoute
  ) {

  }


  btnAdd_click(){

    this.database.insertReview(this.review, this.mId)
      .then((data)=>{
        alert("Record added successfully");
        this.router.navigate(['/list']);
      })
      .catch((err)=>{
        alert("Error in insert");
      });
  }
}
