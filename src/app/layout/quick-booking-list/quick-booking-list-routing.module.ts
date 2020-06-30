import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuickBookingListComponent } from './quick-booking-list.component';


const routes: Routes = [{
	path:'',
	component:QuickBookingListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuickBookingListRoutingModule { }
