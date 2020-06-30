import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RaceMasterComponent } from './race-master.component';


const routes: Routes = [{
	path:'',
	component:RaceMasterComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaceMasterRoutingModule { }
