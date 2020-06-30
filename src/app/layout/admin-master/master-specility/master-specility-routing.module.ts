import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterSpecilityComponent } from './master-specility.component';


const routes: Routes = [{
	path:'',
	component:MasterSpecilityComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterSpecilityRoutingModule { }
