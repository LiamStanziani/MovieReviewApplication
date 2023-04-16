import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListpageComponent } from './listpage/listpage.component';
import { AddpageComponent } from './addpage/addpage.component';
import { SettingspageComponent } from './settingspage/settingspage.component';
import { ModifypageComponent } from './modifypage/modifypage.component';
import { DetailpageComponent } from './detailpage/detailpage.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { NavComponent } from './nav/nav.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomepageComponent } from './homepage/homepage.component';
import { AboutpageComponent } from './aboutpage/aboutpage.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { AddreviewpageComponent } from './addreviewpage/addreviewpage.component';

@NgModule({
  declarations: [
    AppComponent,
    ListpageComponent,
    AddpageComponent,
    SettingspageComponent,
    ModifypageComponent,
    DetailpageComponent,
    ProfilepageComponent,
    NavComponent,
    HomepageComponent,
    AboutpageComponent,
    ErrorpageComponent,
    AddreviewpageComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
