import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NationalityMasterComponent } from './nationality-master.component';

const routes: Routes = [{
	path:'',
	component:NationalityMasterComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NationalityMasterRoutingModule { }
