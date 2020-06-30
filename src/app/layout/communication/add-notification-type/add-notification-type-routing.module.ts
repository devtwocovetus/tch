import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNotificationTypeComponent } from './add-notification-type.component';



const routes: Routes = [{
	path:'',
	component:AddNotificationTypeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddNotificationTypeRoutingModule { }
