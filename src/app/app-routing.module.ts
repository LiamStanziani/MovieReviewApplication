import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutpageComponent} from "./aboutpage/aboutpage.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {AddpageComponent} from "./addpage/addpage.component";
import {DetailpageComponent} from "./detailpage/detailpage.component";
import {ListpageComponent} from "./listpage/listpage.component";
import {ModifypageComponent} from "./modifypage/modifypage.component";
import {ErrorpageComponent} from "./errorpage/errorpage.component";
import {SettingspageComponent} from "./settingspage/settingspage.component";
import {ProfilepageComponent} from "./profilepage/profilepage.component";
import {AddreviewpageComponent} from "./addreviewpage/addreviewpage.component";

const routes: Routes = [
  {path: "home", component: HomepageComponent},
  {path: "about", component: AboutpageComponent},
  {path: "add", component: AddpageComponent},
  {path: "detail/:id", component: DetailpageComponent},
  {path: "list", component: ListpageComponent},
  {path: "modify/:id", component: ModifypageComponent},
  {path: "addreview/:id", component: AddreviewpageComponent},
  {path: "profile", component: ProfilepageComponent},
  {path: "settings", component: SettingspageComponent},
  {path: "", redirectTo: '/home', pathMatch:'full'},
  {path: "**", component: ErrorpageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
