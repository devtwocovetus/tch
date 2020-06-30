import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterDesignationComponent } from './master-designation.component';


const routes: Routes = [{
	path:'',
	component:MasterDesignationComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDesignationRoutingModule { }
