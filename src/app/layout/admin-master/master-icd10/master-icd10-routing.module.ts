import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterIcd10Component } from './master-icd10.component';


const routes: Routes = [{
	path:'',
	component:MasterIcd10Component
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterIcd10RoutingModule { }
