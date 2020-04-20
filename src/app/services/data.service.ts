import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  speakersEndPointUrl = 'https://sessionize.com/api/v2/75tc7uhn/view/Speakers';
  scheduleEndpointUrl = 'https://sessionize.com/api/v2/lrqa96hc/view/GridSmart';
  allDataEndpointUrl =  'https://sessionize.com/api/v2/75tc7uhn/view/All';
  allDataEndpointUrlMock = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getSpeakers() {
    return this.httpClient.get(this.speakersEndPointUrl).pipe(retry(3),catchError(this.handleError));
  }

  getSchedule() {
    return this.httpClient.get(this.scheduleEndpointUrl).pipe(retry(3),catchError(this.handleError));
  }

  getAllData() {
    return this.httpClient.get<Config>(this.allDataEndpointUrl).pipe(retry(3),catchError(this.handleError));
  }
  getAllDataLocalMock() {
    return this.httpClient.get<Config>(this.allDataEndpointUrlMock).pipe(retry(3),catchError(this.handleError));
  }

}

export interface Config {
  sessions: Array<any>;
  speakers: Array<any>;
  categories: Array<any>;
}
