import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterAnesthesiaComponent } from './master-anesthesia.component';


const routes: Routes = [{
	path:'',
	component:MasterAnesthesiaComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterAnesthesiaRoutingModule { }
