import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../service/event.service';
import { IEvent } from '../../model/model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {

  activateRoute = inject(ActivatedRoute); // It will read The query to select id from the url. 

  eventService = inject(EventService);   // Inejecting dependency. 

  eventData$ : Observable<IEvent> = new Observable<IEvent>;
  
  constructor() {
    this.activateRoute.params.subscribe(( res : any ) => {
      this.eventData$ = this.eventService.getEventById(res.id);
    });
  }
  
  
}
