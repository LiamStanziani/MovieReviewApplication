import { Component } from '@angular/core';
import {DatabaseService} from "../../services/database.service";

@Component({
  selector: 'app-settingspage',
  templateUrl: './settingspage.component.html',
  styleUrls: ['./settingspage.component.css']
})
export class SettingspageComponent {
  constructor(private database: DatabaseService) {
  }

  createDatabase() {
    this.database.initDB();
  }

  clearDatabase() {
    this.database.clearDB();
  }
}
