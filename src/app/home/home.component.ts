import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  template: `
    <section>
    <form>
    <input type="text" placeholder="Filter by city" #filter>
      <button class="primary" type="button" (click)="filterResults(filter.value)" >Search</button>
    </form>
  </section>
  <section class="results">
    <app-housing-location 
    *ngFor="let housingLocation of filteredLocationList" 
    [housingLocation] = "housingLocation" ></app-housing-location>
  </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  errMessage! : any;
  subscription! : Subscription;
  housingLocationList : HousingLocation[] | undefined;
  filteredLocationList: HousingLocation[] | undefined = [];

  constructor(private houseService : HousingService) {}

  ngOnInit(): void {
    this.subscription = this.houseService.getAllHousingLocations().subscribe({
      next : housingLocationList => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = this.housingLocationList;
      },
      error : err => this.errMessage = err
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }
  
    this.filteredLocationList = this.housingLocationList?.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
