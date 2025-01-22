import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAPIResponse } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  apiurl : string = 'http://localhost:3000/data';

  constructor(private http : HttpClient) { }

  // Get API to getAllEvents
  getAllEvents() {
    return this.http.get<IAPIResponse>(`${this.apiurl}`)
  }
}
