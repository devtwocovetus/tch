import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VcListComponent } from './vc-list.component';


const routes: Routes = [{
	path:'',
	component:VcListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VcListRoutingModule { }
