import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = "https://sessionize.com/api/v2/lrqa96hc/view/Speakers";

  constructor(private httpClient: HttpClient) { }

  sendGetRequest() {
    return this.httpClient.get(this.apiUrl);
  }

}
