import { Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { MyBookingComponent } from './view/my-booking/my-booking.component';
import { EventComponent } from './view/event/event.component';

export const routes: Routes = [
    
    // Default route
    {
        path : '',
        redirectTo : 'app-home',
        pathMatch : 'full'
    },

    {
        path : 'app-home',
        component : HomeComponent
    },

    {
        path : 'event/:id',
        component : EventComponent
    },

    {
        path : 'app-my-booking',
        component : MyBookingComponent
    }
];
