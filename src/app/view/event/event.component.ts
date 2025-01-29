import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../service/event.service';
import { IEvent } from '../../model/model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event',
  imports: [CommonModule, AsyncPipe, FormsModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {

  activateRoute = inject(ActivatedRoute); // It will read The query to select id from the url. 

  eventService = inject(EventService);   // Inejecting dependency. 

  eventData$ : Observable<IEvent> = new Observable<IEvent>;

  @ViewChild('model') model !: ElementRef;

  members : any = {
    "Name" : "",
    "Age" : 0,
    "IdentityCard" : "",
    "CardNo" : "",
    "ContactNo" : ""
  };
  
  bookingObj : any = {
    "BookingId" : 0,
    "UserId" : 0,
    "EventId" : 0,
    "NoOfTickets" : 0,
    "EventBookingMembers" : []
  };

  constructor() {
    this.activateRoute.params.subscribe(( res : any ) => {
      this.eventData$ = this.eventService.getEventById(res.id);
    });
  }

  addMember() {
    const newObj = JSON.stringify(this.members);
    const obj = JSON.parse(newObj);
    this.bookingObj.EventBookingMembers.push(obj);
  }
  
  openModel() {
    if(this.model){
      this.model.nativeElement.style.display = 'block';
    }
  }

  closeModel() {
    if(this.model){
      this.model.nativeElement.style.display = 'none';
    }
  }
}
