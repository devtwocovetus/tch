import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAppointmentComponent } from './view-appointment.component';


const routes: Routes = [{
	path:'',
	component:ViewAppointmentComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewAppointmentRoutingModule { }
