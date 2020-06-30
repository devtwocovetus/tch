import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditNotificationComponent } from './edit-notification.component';
// import { EditNotificationsComponent } from './edit-notification.component';



const routes: Routes = [
    {
	path:'',
	 component:EditNotificationComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditNotificationRoutingModule { }
