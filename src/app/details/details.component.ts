import { Component, OnInit, OnDestroy } from '@angular/core';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  template: `
    <article>
    <img class="listing-photo" [src]="housingLocation?.photo"
      alt="Exterior photo of {{housingLocation?.name}}"/>
    <section class="listing-description">
      <h2 class="listing-heading">{{housingLocation?.name}}</h2>
      <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
    </section>
    <section class="listing-features">
      <h2 class="section-heading">About this housing location</h2>
      <ul>
        <li>Units available: {{housingLocation?.availableUnits}}</li>
        <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
        <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
      </ul>
    </section>
    <section class="listing-apply">
      <h2 class="section-heading">Apply now to live here</h2>
      <form [formGroup]="applyForm" (submit)="submitApplication()">
        <label for="first-name">First Name</label>
        <input id="first-name" type="text" formControlName="firstName">

        <label for="last-name">Last Name</label>
        <input id="last-name" type="text" formControlName="lastName">

        <label for="email">Email</label>
        <input id="email" type="email" formControlName="email">
        <button type="submit" class="primary">Apply now</button>
      </form>
    </section>
  </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  errMessage! : any;
  subscription! : Subscription;
  housingLocation : HousingLocation | undefined;
  housingLocationId = -1;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor(private houseService: HousingService, private activatedRoute : ActivatedRoute) {}

  ngOnInit(): void {
    const housingLocationId = parseInt(this.activatedRoute.snapshot.params['id'], 10);
    this.subscription = this.houseService.getHousingLocationById(housingLocationId).subscribe({
      next : housingLocation => this.housingLocation = housingLocation,
      error : err => this.errMessage = err
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submitApplication() {
    this.houseService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
