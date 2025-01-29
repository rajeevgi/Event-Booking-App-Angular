import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IAPIResponse, User } from './model/model';
import { CommonModule } from '@angular/common';
import { EventService } from './service/event.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'EventApp';

  eventService = inject(EventService);

  @ViewChild('model') model!: ElementRef;

  isLoginForm: boolean = false;
  userObj: User = new User();

  constructor() {
    const loggedInUser = localStorage.getItem('User');

    if(loggedInUser != null){
      this.userObj = JSON.parse(loggedInUser);
    }
  }

  openPopUp() {
    if (this.model) {
      this.model.nativeElement.style.display = 'block';
    }
  }

  closePopUp() {
    if (this.model) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  onRegister() {
    this.eventService.registerUser(this.userObj).subscribe({
      next: (res: IAPIResponse) => {
        console.log('Register Resposne.', res); // for debugging
        if (res.result) {
          alert(res.message);
          this.closePopUp();
        } else {
          alert(res.message);
        }
      },
    });
  }

  onLogin() {
    this.eventService.loginUser(this.userObj).subscribe({
      next: (res: IAPIResponse) => {
        console.log('login Resposne.', res); // for debugging
        if (res.result) {
          alert('Login Successful');
          localStorage.setItem('user', JSON.stringify(res.data || {})); // avoid storing undefined.
          this.closePopUp();
        } else {
          alert(res.message);
        }
      },
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.userObj = new User();
  }

}
