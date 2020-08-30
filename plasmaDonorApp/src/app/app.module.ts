import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddDonorComponent } from './components/add-donor/add-donor.component';
import { SearchDonorComponent } from './components/search-donor/search-donor.component';
import { Router, RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { DonorDetailsComponent } from './components/donor-details/donor-details.component'

@NgModule({
  declarations: [
    AppComponent,
    AddDonorComponent,
    SearchDonorComponent,
    DonorDetailsComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
