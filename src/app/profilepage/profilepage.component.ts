import { Component } from '@angular/core';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent {
  username: any = "";
  image: any;
  title = 'Profile page';

  ngOnInit(){
    this.username = localStorage.getItem("username");
  }

  btnSubmit_Click() {
    localStorage.setItem("username", this.username);
  }
}
