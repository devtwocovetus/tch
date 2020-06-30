import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VcNotificationComponent } from './vc-notification.component';


const routes: Routes = [{
	path:'',
	component:VcNotificationComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VcNotificationRoutingModule { }
