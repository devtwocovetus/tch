import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhysicianMasterComponent } from './physician-master.component';


const routes: Routes = [{
	path:'',
	component:PhysicianMasterComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhysicianMasterRoutingModule { }
