import { Component, inject, OnInit } from '@angular/core';
import { EventService } from '../../service/event.service';
import { IAPIResponse, IEvent } from '../../model/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  // Adding dependency
  eventService = inject(EventService);
  
  ngOnInit(): void {
    this.getAllEvents();
  }

  eventList : IEvent[] = [];
  // Get api for getting list of events
  getAllEvents() {
    this.eventService.getAllEvents().subscribe((res : IAPIResponse) => {
      this.eventList = res.data;
    });
  }
}
