import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule, routes } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { DetailsComponent } from '../details/details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HousingLocationComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
