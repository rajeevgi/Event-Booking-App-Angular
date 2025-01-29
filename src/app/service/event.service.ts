import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAPIResponse, IEvent, User } from '../model/model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiurl = 'http://localhost:3000/events';

  private userApi = 'http://localhost:4000/users';

  constructor(private http: HttpClient) {}

  // Get API to getAllEvents.
  getAllEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(`${this.apiurl}`);
  }

  // Get API to get Events by Id.
  getEventById(userId: number) {
    return this.http.get<IEvent>(`${this.apiurl}/${userId}`);
  }

  // Post Api to register user.
  registerUser(user: User): Observable<IAPIResponse> {
    return this.http.post<User>(this.userApi, user).pipe(
      map((newUser) => ({
        result: true,
        message: "Registration successful",
        data: newUser
      }))
    );
  }

  // Post Api to login user.
  loginUser(userObj: User): Observable<IAPIResponse> {
    // console.log('this', userObj);

    return this.http.get<User[]>(this.userApi).pipe(
      map((users) => {
        const foundUser = users.find(
          (user) =>
            user.Email === userObj.Email && user.Password === userObj.Password
        );

        if (foundUser) {
          return { result: true, message: 'Login successful', data: foundUser };
        } else {
          return { result: false, message: 'Invalid email or password' };
        }
      })
    );
  }
}
