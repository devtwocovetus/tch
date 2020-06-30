import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurgeryMasterComponent } from './surgery-master.component';

const routes: Routes = [{
	path:'',
	component:SurgeryMasterComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurgeryMasterRoutingModule { }
