import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VcCancelListComponent } from './vc-cancel-list.component';


const routes: Routes = [{
	path:'',
	component:VcCancelListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VcCancelListRoutingModule { }
