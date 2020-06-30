import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterCptComponent } from './master-cpt.component';


const routes: Routes = [{
	path:'',
	component:MasterCptComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterCptRoutingModule { }
