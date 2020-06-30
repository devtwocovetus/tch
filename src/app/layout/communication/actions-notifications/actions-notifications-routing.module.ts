import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActionsnotificationsComponent } from './actions-notifications.component';


const routes: Routes = [{
	path:'',
	 component:ActionsnotificationsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionsnotificatinsRoutingModule { }
