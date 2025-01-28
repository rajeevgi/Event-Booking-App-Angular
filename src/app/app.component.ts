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
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EventApp';

  eventService = inject(EventService);

  @ViewChild('model') model !: ElementRef;

  isLoginForm : boolean = false;

  loginObj : any = {
    "Email": "",
    "Password" : ""
  }

  userObj : User = new User();

  openPopUp() {
    if(this.model){
      this.model.nativeElement.style.display = 'block';
    }
  }

  closePopUp() {
    if(this.model){
      this.model.nativeElement.style.display = 'none';
    }
  }

  onRegister() {
    this.eventService.registerUser(this.userObj).subscribe((res : IAPIResponse) => {
      if(!res.result){
        alert("Registration Successfull");
        this.closePopUp();
      }else {
        alert(res.message);
      }
    });
  }
  
  onLogin() {
    this.eventService.registerUser(this.loginObj).subscribe((res : IAPIResponse) => {
      if(!res.result){
        alert("login Successfully");
        localStorage.getItem('users');
        this.closePopUp();
      }else {
        alert(res.message);
      }
    });
  }
  
}
