import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationTimeComponent } from './notification-time.component';

const routes: Routes = [
{path:'',component:NotificationTimeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationTimeRoutingModule { }
