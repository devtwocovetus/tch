import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EthinicityMasterComponent } from './ethinicity-master.component';


const routes: Routes = [{
	path:'',
	component:EthinicityMasterComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EthinicityMasterRoutingModule { }
