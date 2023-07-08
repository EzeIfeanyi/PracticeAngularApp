import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';
import { HttpClient } from '@angular/common/http';
import { pipe, tap, catchError, throwError, Observable, filter } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  url = 'http://localhost:3000/locations';

  constructor(private http : HttpClient) { 

   }

  getAllHousingLocations() : Observable<HousingLocation[]> {
    return this.http.get<HousingLocation[]>(this.url).pipe(
      tap(data => console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  
  handleError(err : HttpErrorResponse) {
    let errMessage = '';

    if (err.error instanceof ErrorEvent) {
      errMessage = `An error occurred: ${err.error.message}`;
    } else {
      errMessage = `Server returned error code: ${err.status}, error message: ${err.message}`;
    }
    console.error(errMessage);
    return throwError(() => errMessage);
  }
  
  getHousingLocationById(id: number) : Observable<HousingLocation> {
    return this.http.get<HousingLocation>(`${this.url}/${id}`).pipe(
      tap(data => console.log('All', JSON.stringify(data))),
      filter(data => data.id === id ),
      catchError(this.handleError)
    );
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }

  housingLocationList : HousingLocation[] | undefined;
}
