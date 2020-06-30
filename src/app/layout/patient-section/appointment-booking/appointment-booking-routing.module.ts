import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentBookingComponent } from './appointment-booking.component';

const routes: Routes = [
 {path:'',component:AppointmentBookingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentBookingRoutingModule { }
