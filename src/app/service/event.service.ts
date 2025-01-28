import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAPIResponse, IEvent, User } from '../model/model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiurl  = 'http://localhost:3000/events';

  private userApi = 'http://localhost:4000/users';

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
    return this.http.get<IEvent>(`${this.apiurl}/${userId}`)
  }

  // Post Api to register user 
  registerUser(obj : User){
    return this.http.post<IAPIResponse>(`${this.userApi}`, obj);
  }

  loginUser(){
    return this.http.get<IAPIResponse>(`${this.userApi}`);
  }
}
