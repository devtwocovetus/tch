import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationPasscodeComponent } from './notification-passcode.component';


const routes: Routes = [
{path:'',component:NotificationPasscodeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationPasscodeRoutingModule { }
