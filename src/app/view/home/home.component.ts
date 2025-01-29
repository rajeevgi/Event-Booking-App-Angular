import { Component, inject, OnInit } from '@angular/core';
import { EventService } from '../../service/event.service';
import { IAPIResponse, IEvent, User } from '../../model/model';
// import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule, RouterLink, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  // Adding dependency
  eventService = inject(EventService);

  ngOnInit(): void {
    this.getAllEvents();
  }

  eventList: IEvent[] = [];
  // Get api for getting list of events
  getAllEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (data: IEvent[]) => {
        this.eventList = data; // Assign response data to eventList
      },

      error: (err) => {
        console.error('Error fetching events:', err);
      },
    });
  }

}
