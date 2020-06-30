import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import { UpdatenotificationsComponent } from './update-notifications.component';


const routes: Routes = [
{
	path:'',
	component:UpdatenotificationsComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdatenotificationsRoutingModule { }
