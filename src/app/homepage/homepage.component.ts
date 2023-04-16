import { Component } from '@angular/core';
import {DatabaseService} from "../../services/database.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  constructor(private database: DatabaseService, private ar: ActivatedRoute) {
  }

  ngOnInit()
  {
    this.database.initDB();
  }
}
