import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterAlertsComponent } from './master-alerts.component';


const routes: Routes = [{
	path:'',
	component:MasterAlertsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterAlertsRoutingModule { }
