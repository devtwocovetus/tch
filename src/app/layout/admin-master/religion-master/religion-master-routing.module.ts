import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReligionMasterComponent } from './religion-master.component';


const routes: Routes = [{
	path:'',
	component:ReligionMasterComponent
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReligionMasterRoutingModule { }
