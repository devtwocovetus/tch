import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationActionComponent } from './notification-action.component';

const routes: Routes = [{
	path:'',
	component:NotificationActionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationActionRoutingModule { }
