import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEvent } from '../model/model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiurl  = 'http://localhost:3000/events';

  constructor(private http : HttpClient) { }

  // Get API to getAllEvents
  getAllEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(`${this.apiurl}`);
  }

  // Get Api to get Event details by Id
  // getEventById(userId : number) : Observable<IEvent[]> {
  //   return this.http.get<IEvent[]>(`${this.apiurl}?userId=${userId}`);
  // }

  getEventById(userId : number) {
    return this.http.get<IEvent>(`${this.apiurl}/getEventById?userId=${userId}`).pipe(
      map((item : any) => {
        return item.data;
      })
    );
  }


}
